-- Phase 4: Background Tasks & Queues Migration
-- Created: December 4, 2025

-- ============================================================================
-- TABLE 1: agent_tasks - Task Queue for Background Processing
-- ============================================================================

CREATE TABLE IF NOT EXISTS agent_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    
    -- Task details
    task_type TEXT NOT NULL CHECK (task_type IN (
        'reply_to_inquiry',
        'daily_summary',
        'weekly_summary',
        'profile_enrichment',
        'draft_outreach'
    )),
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    
    -- Status tracking
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',
        'processing',
        'completed',
        'failed'
    )),
    result JSONB,
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    
    -- Scheduling
    scheduled_at TIMESTAMPTZ,
    executed_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_agent_tasks_user_id ON agent_tasks(user_id);
CREATE INDEX idx_agent_tasks_slug ON agent_tasks(slug);
CREATE INDEX idx_agent_tasks_status ON agent_tasks(status) WHERE status IN ('pending', 'processing');
CREATE INDEX idx_agent_tasks_scheduled ON agent_tasks(scheduled_at) WHERE scheduled_at IS NOT NULL;
CREATE INDEX idx_agent_tasks_created ON agent_tasks(created_at DESC);
CREATE INDEX idx_agent_tasks_task_type ON agent_tasks(task_type);

-- Composite index for worker queries
CREATE INDEX idx_agent_tasks_pending ON agent_tasks(status, scheduled_at, created_at) 
    WHERE status = 'pending';

-- RLS Policies
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;

-- Users can only access their own tasks
CREATE POLICY "Users can select own tasks"
    ON agent_tasks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
    ON agent_tasks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
    ON agent_tasks FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
    ON agent_tasks FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================================
-- TABLE 2: investor_inquiries - Store visitor inquiries for autonomous replies
-- ============================================================================

CREATE TABLE IF NOT EXISTS investor_inquiries (
    id BIGSERIAL PRIMARY KEY,
    slug TEXT NOT NULL,
    
    -- Visitor information
    visitor_id UUID,
    visitor_name TEXT,
    visitor_email TEXT,
    
    -- Inquiry details
    message TEXT NOT NULL,
    context JSONB DEFAULT '{}'::jsonb,
    
    -- Status tracking
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
        'new',
        'processing',
        'replied',
        'archived'
    )),
    
    -- Reply information
    reply_text TEXT,
    replied_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_investor_inquiries_slug ON investor_inquiries(slug);
CREATE INDEX idx_investor_inquiries_status ON investor_inquiries(status) WHERE status IN ('new', 'processing');
CREATE INDEX idx_investor_inquiries_created ON investor_inquiries(created_at DESC);
CREATE INDEX idx_investor_inquiries_visitor_id ON investor_inquiries(visitor_id) WHERE visitor_id IS NOT NULL;

-- Composite index for queries
CREATE INDEX idx_investor_inquiries_slug_status ON investor_inquiries(slug, status, created_at DESC);

-- RLS Policies - Public can insert, users can read their own
ALTER TABLE investor_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit inquiries
CREATE POLICY "Anyone can insert inquiries"
    ON investor_inquiries FOR INSERT
    WITH CHECK (true);

-- Users can read inquiries for their slug
CREATE POLICY "Users can select inquiries for their slug"
    ON investor_inquiries FOR SELECT
    USING (
        slug IN (
            SELECT slug FROM investor_profiles 
            WHERE user_id = auth.uid()
        )
    );

-- Users can update status of their inquiries
CREATE POLICY "Users can update own inquiries"
    ON investor_inquiries FOR UPDATE
    USING (
        slug IN (
            SELECT slug FROM investor_profiles 
            WHERE user_id = auth.uid()
        )
    );

-- ============================================================================
-- FUNCTION: Update updated_at timestamp
-- ============================================================================

CREATE OR REPLACE FUNCTION update_task_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS trigger_update_agent_tasks_timestamp ON agent_tasks;
CREATE TRIGGER trigger_update_agent_tasks_timestamp
    BEFORE UPDATE ON agent_tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_task_updated_at();

DROP TRIGGER IF EXISTS trigger_update_inquiries_timestamp ON investor_inquiries;
CREATE TRIGGER trigger_update_inquiries_timestamp
    BEFORE UPDATE ON investor_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_task_updated_at();

-- ============================================================================
-- FUNCTION: Auto-enqueue reply task when inquiry is created
-- ============================================================================

CREATE OR REPLACE FUNCTION auto_enqueue_inquiry_reply()
RETURNS TRIGGER AS $$
DECLARE
    profile_user_id UUID;
    agent_autonomy_enabled BOOLEAN;
BEGIN
    -- Get user_id and check if autonomy is enabled
    SELECT p.user_id, COALESCE(a.autonomy_enabled, false)
    INTO profile_user_id, agent_autonomy_enabled
    FROM investor_profiles p
    LEFT JOIN investor_agents a ON a.slug = p.slug
    WHERE p.slug = NEW.slug
    AND p.is_public = true
    AND p.user_confirmed = true;
    
    -- Only enqueue if autonomy is enabled
    IF agent_autonomy_enabled AND profile_user_id IS NOT NULL THEN
        INSERT INTO agent_tasks (
            user_id,
            slug,
            task_type,
            payload,
            status
        ) VALUES (
            profile_user_id,
            NEW.slug,
            'reply_to_inquiry',
            jsonb_build_object(
                'inquiry_id', NEW.id,
                'message', NEW.message,
                'visitor_name', NEW.visitor_name,
                'visitor_email', NEW.visitor_email
            ),
            'pending'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-enqueue inquiry replies
DROP TRIGGER IF EXISTS trigger_auto_enqueue_inquiry ON investor_inquiries;
CREATE TRIGGER trigger_auto_enqueue_inquiry
    AFTER INSERT ON investor_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION auto_enqueue_inquiry_reply();

-- ============================================================================
-- COMMENTS for documentation
-- ============================================================================

COMMENT ON TABLE agent_tasks IS 'Background task queue for autonomous agent operations (Phase 4)';
COMMENT ON TABLE investor_inquiries IS 'Visitor inquiries that can trigger autonomous agent replies (Phase 4)';

COMMENT ON COLUMN agent_tasks.task_type IS 'Type of task: reply_to_inquiry, daily_summary, weekly_summary, profile_enrichment, draft_outreach';
COMMENT ON COLUMN agent_tasks.status IS 'Task status: pending, processing, completed, failed';
COMMENT ON COLUMN agent_tasks.scheduled_at IS 'When to execute the task (NULL = execute ASAP)';
COMMENT ON COLUMN agent_tasks.retry_count IS 'Number of times this task has been retried';

COMMENT ON COLUMN investor_inquiries.status IS 'Inquiry status: new, processing, replied, archived';
COMMENT ON COLUMN investor_inquiries.context IS 'Additional context about the inquiry (referrer, user agent, etc.)';

-- ============================================================================
-- Grant permissions
-- ============================================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON agent_tasks TO authenticated;
GRANT SELECT, INSERT, UPDATE ON investor_inquiries TO authenticated;
GRANT INSERT ON investor_inquiries TO anon;
GRANT USAGE, SELECT ON SEQUENCE investor_inquiries_id_seq TO authenticated, anon;

-- ============================================================================
-- Migration complete
-- ============================================================================

-- Summary:
-- ✅ agent_tasks table created (task queue)
-- ✅ investor_inquiries table created (inquiry storage)
-- ✅ Indexes created for performance
-- ✅ RLS policies configured
-- ✅ Auto-enqueue trigger for autonomous replies
-- ✅ Updated_at triggers added

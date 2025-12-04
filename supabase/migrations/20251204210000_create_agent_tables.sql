-- Phase 3: MCP Server - Agent Tables Migration
-- Created: December 4, 2025

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE 1: investor_agents
-- Purpose: Store agent configuration and settings for each investor
-- ============================================================================

CREATE TABLE IF NOT EXISTS investor_agents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    slug TEXT NOT NULL REFERENCES investor_profiles(slug) ON DELETE CASCADE,
    
    -- Agent prompts
    public_prompt TEXT DEFAULT 'You are a professional spokesperson for this investor. Answer questions based only on their public profile information. Be helpful but do not share or infer information not explicitly stated in the profile.',
    private_prompt TEXT DEFAULT 'You are a personal AI assistant for this investor. You have access to their full profile and can help manage their information, preferences, and connections. Be proactive and helpful.',
    
    -- Agent settings
    autonomy_enabled BOOLEAN DEFAULT false,
    reply_style TEXT DEFAULT 'medium', -- 'short', 'medium', 'long'
    reply_tone TEXT DEFAULT 'professional', -- 'casual', 'professional', 'formal'
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_agent_per_user UNIQUE(user_id),
    CONSTRAINT unique_agent_per_slug UNIQUE(slug),
    CONSTRAINT valid_reply_style CHECK (reply_style IN ('short', 'medium', 'long')),
    CONSTRAINT valid_reply_tone CHECK (reply_tone IN ('casual', 'professional', 'formal'))
);

-- Indexes for performance
CREATE INDEX idx_investor_agents_user_id ON investor_agents(user_id);
CREATE INDEX idx_investor_agents_slug ON investor_agents(slug);
CREATE INDEX idx_investor_agents_autonomy ON investor_agents(autonomy_enabled) WHERE autonomy_enabled = true;

-- RLS Policies
ALTER TABLE investor_agents ENABLE ROW LEVEL SECURITY;

-- Users can only access their own agent
CREATE POLICY "Users can select own agent"
    ON investor_agents FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own agent"
    ON investor_agents FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agent"
    ON investor_agents FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own agent"
    ON investor_agents FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================================
-- TABLE 2: agent_messages
-- Purpose: Store conversation history for both public and private chats
-- ============================================================================

CREATE TABLE IF NOT EXISTS agent_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    
    -- Conversation metadata
    mode TEXT NOT NULL CHECK (mode IN ('public', 'private')),
    visitor_id UUID, -- For public chats, track anonymous visitors
    
    -- Message content
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system', 'tool')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb, -- Additional context (tool calls, etc.)
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_agent_messages_user_id ON agent_messages(user_id);
CREATE INDEX idx_agent_messages_slug ON agent_messages(slug);
CREATE INDEX idx_agent_messages_mode ON agent_messages(mode);
CREATE INDEX idx_agent_messages_visitor_id ON agent_messages(visitor_id) WHERE visitor_id IS NOT NULL;
CREATE INDEX idx_agent_messages_created_at ON agent_messages(created_at DESC);
CREATE INDEX idx_agent_messages_metadata ON agent_messages USING GIN(metadata);

-- Composite index for common queries
CREATE INDEX idx_agent_messages_slug_mode_created ON agent_messages(slug, mode, created_at DESC);

-- RLS Policies
ALTER TABLE agent_messages ENABLE ROW LEVEL SECURITY;

-- Users can only access their own messages (private mode)
CREATE POLICY "Users can select own private messages"
    ON agent_messages FOR SELECT
    USING (auth.uid() = user_id AND mode = 'private');

-- Users can insert their own messages
CREATE POLICY "Users can insert own messages"
    ON agent_messages FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can view public messages for their slug (for analytics)
CREATE POLICY "Users can select own public messages"
    ON agent_messages FOR SELECT
    USING (auth.uid() = user_id AND mode = 'public');

-- ============================================================================
-- FUNCTION: Auto-provision agent when profile is confirmed
-- ============================================================================

CREATE OR REPLACE FUNCTION auto_provision_investor_agent()
RETURNS TRIGGER AS $$
BEGIN
    -- Only create agent if profile is confirmed and agent doesn't exist
    IF NEW.user_confirmed = true AND OLD.user_confirmed = false THEN
        INSERT INTO investor_agents (user_id, slug)
        VALUES (NEW.user_id, NEW.slug)
        ON CONFLICT (user_id) DO NOTHING; -- Prevent duplicate if agent exists
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-provision agent on profile confirmation
DROP TRIGGER IF EXISTS trigger_auto_provision_agent ON investor_profiles;
CREATE TRIGGER trigger_auto_provision_agent
    AFTER UPDATE ON investor_profiles
    FOR EACH ROW
    EXECUTE FUNCTION auto_provision_investor_agent();

-- ============================================================================
-- FUNCTION: Update updated_at timestamp
-- ============================================================================

CREATE OR REPLACE FUNCTION update_investor_agent_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on agent updates
DROP TRIGGER IF EXISTS trigger_update_agent_timestamp ON investor_agents;
CREATE TRIGGER trigger_update_agent_timestamp
    BEFORE UPDATE ON investor_agents
    FOR EACH ROW
    EXECUTE FUNCTION update_investor_agent_updated_at();

-- ============================================================================
-- COMMENTS for documentation
-- ============================================================================

COMMENT ON TABLE investor_agents IS 'Agent configuration and settings for each investor (Phase 3: MCP Server)';
COMMENT ON TABLE agent_messages IS 'Conversation history for public and private agent chats (Phase 3: MCP Server)';

COMMENT ON COLUMN investor_agents.public_prompt IS 'System prompt for public chat mode (used by website visitors)';
COMMENT ON COLUMN investor_agents.private_prompt IS 'System prompt for private chat mode (used by profile owner)';
COMMENT ON COLUMN investor_agents.autonomy_enabled IS 'Enable sleeping agent to auto-respond to inquiries';
COMMENT ON COLUMN agent_messages.mode IS 'Chat mode: public (website visitor) or private (profile owner)';
COMMENT ON COLUMN agent_messages.visitor_id IS 'Anonymous visitor tracking for public chats';
COMMENT ON COLUMN agent_messages.metadata IS 'Additional context: tool calls, function results, etc.';

-- ============================================================================
-- Grant permissions
-- ============================================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON investor_agents TO authenticated;
GRANT SELECT, INSERT ON agent_messages TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ============================================================================
-- Migration complete
-- ============================================================================

-- Summary:
-- ✅ investor_agents table created
-- ✅ agent_messages table created  
-- ✅ Indexes created for performance
-- ✅ RLS policies configured
-- ✅ Auto-provisioning trigger added
-- ✅ Updated_at trigger added

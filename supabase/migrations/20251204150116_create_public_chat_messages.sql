-- Table to store public chat messages (optional - for analytics)
CREATE TABLE IF NOT EXISTS public.public_chat_messages (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL,
  visitor_id TEXT, -- Optional: browser fingerprint or session ID
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast slug lookups
CREATE INDEX idx_public_chat_messages_slug ON public.public_chat_messages(slug);
CREATE INDEX idx_public_chat_messages_created_at ON public.public_chat_messages(created_at DESC);

-- RLS: Allow anonymous inserts (for logging), no reads needed for public
ALTER TABLE public.public_chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert chat messages"
  ON public.public_chat_messages FOR INSERT
  TO anon
  WITH CHECK (true);

-- Grant access
GRANT INSERT ON public.public_chat_messages TO anon;

-- Comment
COMMENT ON TABLE public.public_chat_messages IS 'Stores public chat conversations for analytics and training';

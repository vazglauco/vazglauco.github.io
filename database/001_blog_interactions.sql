CREATE TABLE IF NOT EXISTS blog_votes (
  post_slug TEXT NOT NULL,
  voter_hash CHAR(64) NOT NULL,
  value SMALLINT NOT NULL CHECK (value IN (-1, 1)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (post_slug, voter_hash)
);

CREATE INDEX IF NOT EXISTS blog_votes_post_slug_idx
  ON blog_votes (post_slug);

CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID PRIMARY KEY,
  post_slug TEXT NOT NULL,
  author_hash CHAR(64) NOT NULL,
  author_name VARCHAR(40) NOT NULL,
  message VARCHAR(1000) NOT NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'published'
    CHECK (status IN ('published', 'hidden', 'pending')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS blog_comments_post_status_date_idx
  ON blog_comments (post_slug, status, created_at DESC);

CREATE TABLE IF NOT EXISTS blog_rate_limits (
  identity_hash CHAR(64) NOT NULL,
  action VARCHAR(24) NOT NULL,
  window_id BIGINT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (identity_hash, action, window_id)
);

CREATE INDEX IF NOT EXISTS blog_rate_limits_window_idx
  ON blog_rate_limits (window_id);

ALTER TABLE blog_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION consume_blog_rate_limit(
  p_identity_hash TEXT,
  p_action TEXT,
  p_window_id BIGINT
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count INTEGER;
BEGIN
  INSERT INTO blog_rate_limits (identity_hash, action, window_id, request_count)
  VALUES (p_identity_hash, p_action, p_window_id, 1)
  ON CONFLICT (identity_hash, action, window_id)
  DO UPDATE SET request_count = blog_rate_limits.request_count + 1
  RETURNING request_count INTO current_count;

  RETURN current_count;
END;
$$;

REVOKE ALL ON FUNCTION consume_blog_rate_limit(TEXT, TEXT, BIGINT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION consume_blog_rate_limit(TEXT, TEXT, BIGINT) TO service_role;

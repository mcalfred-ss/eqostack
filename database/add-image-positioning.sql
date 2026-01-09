-- ============================================
-- Add Image Positioning Columns to blog_posts
-- ============================================
-- 
-- This adds columns to store image positioning preferences
-- Run this in Supabase SQL Editor
--
-- ============================================

-- Add image positioning columns
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS image_position TEXT DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_fit TEXT DEFAULT 'cover';

-- Add comment for documentation
COMMENT ON COLUMN blog_posts.image_position IS 'CSS object-position value: center, top, bottom, left, right, top-left, top-right, bottom-left, bottom-right, or custom coordinates';
COMMENT ON COLUMN blog_posts.image_fit IS 'CSS object-fit value: cover, contain, fill, none, scale-down';

-- Update existing rows to have default values
UPDATE blog_posts 
SET image_position = 'center', image_fit = 'cover' 
WHERE image_position IS NULL OR image_fit IS NULL;

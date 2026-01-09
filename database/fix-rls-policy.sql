-- ============================================
-- Fix RLS Policy for Blog Posts (Public Read)
-- ============================================
-- 
-- Run this if blog posts aren't showing in production
-- This ensures anonymous users can read published posts
--
-- ============================================

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can view published posts" ON blog_posts;

-- Create policy that allows anyone to read published posts
CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT 
  USING (published = true);

-- Verify the policy was created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'blog_posts';

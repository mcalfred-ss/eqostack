-- ============================================
-- Create Admin User
-- ============================================
-- 
-- INSTRUCTIONS:
-- 1. First, create a user in Supabase Dashboard → Authentication → Users
-- 2. Copy the user's UUID (id field)
-- 3. Replace 'USER_UUID_HERE' below with the actual UUID
-- 4. Replace 'your-email@example.com' with the user's email
-- 5. Replace 'Your Name' with the admin's name (optional)
-- 6. Run this SQL in Supabase SQL Editor
--
-- ============================================

INSERT INTO admin_users (id, email, full_name, role)
VALUES (
  'USER_UUID_HERE',  -- Replace with the UUID from Authentication → Users
  'your-email@example.com',  -- Replace with the user's email
  'Your Name',  -- Optional: Replace with admin's name
  'admin'  -- Role: 'admin' or 'editor'
);

-- Verify the admin was created
SELECT * FROM admin_users WHERE email = 'your-email@example.com';

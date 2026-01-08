# Database Setup Guide

## Quick Start

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Run the Schema**
   - Go to your Supabase Dashboard
   - Navigate to **SQL Editor**
   - Copy and paste the contents of `schema.sql`
   - Click **Run**

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Create Your First Admin User**
   - Go to **Authentication** → **Users** in Supabase Dashboard
   - Click **Add User** → **Create new user**
   - Enter email and password
   - Copy the user's UUID
   - Run this SQL in the SQL Editor:
   ```sql
   INSERT INTO admin_users (id, email, full_name, role)
   VALUES ('user-uuid-here', 'your-email@example.com', 'Your Name', 'admin');
   ```

## Database Tables

### `admin_users`
Stores admin user information (extends Supabase auth.users)

### `blog_posts`
Blog posts with publishing controls

### `contact_submissions`
Contact form submissions with status tracking

### `products`
Product listings with features and ordering

### `team_members`
Team member profiles

### `job_positions`
Job openings for careers page

### `site_settings`
Site-wide settings (key-value pairs)

## Row Level Security (RLS)

All tables have RLS enabled:
- **Public read**: Published content is readable by anyone
- **Admin write**: Only authenticated admin users can create/update/delete

## Next Steps

1. Log in at `/admin/login`
2. Access the dashboard at `/admin`
3. Start managing your content!

# ⚠️ Database Update Required

## Error Message
```
Could not find the 'image_fit' column of 'blog_posts' in the schema cache
```

## Solution: Run the SQL Migration

You need to add the `image_fit` and `image_position` columns to your `blog_posts` table.

### Steps:

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click on **SQL Editor** in the left sidebar
   - Click **New Query**

3. **Run the Migration**
   - Copy and paste the contents of `database/add-image-positioning.sql`
   - Or copy this SQL:

```sql
-- Add image positioning columns
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS image_position TEXT DEFAULT 'center',
ADD COLUMN IF NOT EXISTS image_fit TEXT DEFAULT 'cover';

-- Update existing rows to have default values
UPDATE blog_posts 
SET image_position = 'center', image_fit = 'cover' 
WHERE image_position IS NULL OR image_fit IS NULL;
```

4. **Click Run** (or press Ctrl+Enter)

5. **Verify**
   - Go to **Table Editor** → `blog_posts`
   - You should see the new columns: `image_position` and `image_fit`

## After Running the Migration

- Refresh your admin page
- The error should be gone
- You can now use drag-and-drop image positioning!

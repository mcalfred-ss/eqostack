# 🔧 Production Blog Posts Not Showing - Troubleshooting Guide

## Common Issues & Solutions

### 1. ✅ Environment Variables Not Set in Production

**Problem**: Blog posts work locally but not in production.

**Solution**: Add environment variables to your hosting platform:

#### For Render.com:
1. Go to your Render Dashboard
2. Select your service
3. Go to **Environment** tab
4. Add these variables:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
5. **Redeploy** your service after adding variables

#### For Vercel:
1. Go to Project Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
3. Select **Production**, **Preview**, and **Development**
4. Redeploy

#### For Netlify:
1. Go to Site Settings → Environment Variables
2. Add the same variables
3. Redeploy

**Important**: After adding env vars, you MUST redeploy for changes to take effect!

---

### 2. ✅ Supabase RLS (Row Level Security) Policies

**Problem**: RLS policies might be blocking anonymous reads.

**Solution**: Verify your RLS policy allows public reads:

Run this in Supabase SQL Editor to check/fix:

```sql
-- Check if policy exists
SELECT * FROM pg_policies WHERE tablename = 'blog_posts';

-- If policy doesn't exist or is wrong, create/fix it:
DROP POLICY IF EXISTS "Anyone can view published posts" ON blog_posts;

CREATE POLICY "Anyone can view published posts" ON blog_posts
  FOR SELECT 
  USING (published = true);
```

---

### 3. ✅ CORS Configuration in Supabase

**Problem**: Your production domain might not be allowed.

**Solution**: Add your production domain to Supabase:

1. Go to Supabase Dashboard → **Settings** → **API**
2. Under **CORS**, add your production URL:
   ```
   https://eqostack.com
   https://www.eqostack.com
   ```
   (Or whatever your actual domain is)

---

### 4. ✅ Check Browser Console for Errors

**In Production**:
1. Open your live site
2. Press F12 (Developer Tools)
3. Go to **Console** tab
4. Look for errors like:
   - `Supabase not configured`
   - `Error fetching posts from database`
   - CORS errors
   - Network errors

**Common Error Messages**:
- `"Supabase not configured"` → Environment variables missing
- `"new row violates row-level security policy"` → RLS policy issue
- `"CORS policy"` → CORS configuration issue
- `"Failed to fetch"` → Network/connection issue

---

### 5. ✅ Verify Database Has Published Posts

**Check in Supabase**:
1. Go to Supabase Dashboard → **Table Editor** → `blog_posts`
2. Make sure you have posts with `published = true`
3. Verify posts have `published_at` or `created_at` dates

---

### 6. ✅ Test Supabase Connection

**Create a test file** to verify connection:

```javascript
// Test in browser console on your live site:
const testSupabase = async () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  console.log('URL:', url)
  console.log('Key:', key ? 'Set' : 'Missing')
  
  if (!url || !key) {
    console.error('❌ Environment variables not set!')
    return
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('count')
    .eq('published', true)
  
  console.log('Data:', data)
  console.log('Error:', error)
}
```

---

## Quick Checklist

- [ ] Environment variables set in production hosting platform
- [ ] Service redeployed after adding env vars
- [ ] RLS policy allows public SELECT on published posts
- [ ] Production domain added to Supabase CORS settings
- [ ] Database has posts with `published = true`
- [ ] Checked browser console for errors
- [ ] Verified Supabase URL and key are correct

---

## Still Not Working?

1. **Check Render/Vercel/Netlify logs** for build/runtime errors
2. **Test Supabase connection** using the test function above
3. **Verify RLS policies** are correct
4. **Check network tab** in browser DevTools for failed requests
5. **Compare** local `.env` with production environment variables

---

## Need More Help?

Share:
- Your hosting platform (Render/Vercel/Netlify/etc.)
- Browser console errors
- Network tab errors
- Supabase dashboard screenshot of RLS policies

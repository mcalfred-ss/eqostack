# 🔐 Supabase OAuth Configuration for Custom Domain

## After Your Domain is Live

Once `eqostack.com` is working, you need to update your Supabase OAuth settings to use your custom domain instead of the default Supabase callback URL.

## Step 1: Update Supabase Authentication Settings

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **URL Configuration**

## Step 2: Update Site URL

Set the **Site URL** to:
```
https://eqostack.com
```

## Step 3: Add Redirect URLs

Add these URLs to the **Redirect URLs** list:

```
https://eqostack.com/**
https://www.eqostack.com/**
https://eqostack.com/auth/callback
https://www.eqostack.com/auth/callback
```

**Note:** The `**` wildcard allows redirects to any path on your domain.

## Step 4: Update OAuth Provider Settings

If you're using OAuth providers (Google, GitHub, etc.), you need to update their callback URLs:

### For Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add to **Authorized redirect URIs**:
   ```
   https://hexpbdculnmehyonlzbu.supabase.co/auth/v1/callback
   https://eqostack.com/auth/callback
   https://www.eqostack.com/auth/callback
   ```

**Important:** Keep the Supabase callback URL (`https://hexpbdculnmehyonlzbu.supabase.co/auth/v1/callback`) - this is still needed! Supabase handles the OAuth flow and then redirects to your domain.

### For Other OAuth Providers:
- **GitHub**: Update in GitHub Settings → Developer settings → OAuth Apps
- **Facebook**: Update in Facebook Developers → App Settings
- **Any other provider**: Update their callback URL settings similarly

## Step 5: Update Allowed Origins (CORS)

In Supabase Dashboard:
1. Go to **Settings** → **API**
2. Under **CORS**, add:
   ```
   https://eqostack.com
   https://www.eqostack.com
   ```

## What You DON'T Need to Change

✅ **Keep the Supabase callback URL** (`https://hexpbdculnmehyonlzbu.supabase.co/auth/v1/callback`)
- This is Supabase's internal callback URL
- OAuth providers redirect here first
- Supabase then redirects to your domain
- You need BOTH URLs configured

## Summary

**Before Domain:**
- OAuth callback: `https://hexpbdculnmehyonlzbu.supabase.co/auth/v1/callback` ✅

**After Domain:**
- Site URL: `https://eqostack.com` ✅
- Redirect URLs: `https://eqostack.com/**` ✅
- OAuth callback: `https://hexpbdculnmehyonlzbu.supabase.co/auth/v1/callback` ✅ (keep this!)
- OAuth provider redirects: Add your domain URLs ✅

## Testing

After updating:
1. Test OAuth login from `https://eqostack.com`
2. Verify redirects work correctly
3. Check that users are redirected back to your domain after authentication

## Troubleshooting

**"Redirect URI mismatch" error:**
- Make sure you added all redirect URLs in both Supabase AND your OAuth provider
- Check for typos in URLs
- Ensure `https://` (not `http://`)

**Users redirected to Supabase URL:**
- Check your Site URL is set to `https://eqostack.com`
- Verify redirect URLs include your domain

**CORS errors:**
- Add your domain to Supabase CORS settings
- Check browser console for specific errors



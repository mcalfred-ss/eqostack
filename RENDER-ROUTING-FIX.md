# 🔧 Render Static Site Routing Fix

## The Problem
Render isn't applying the routing rules from `_static.json`, causing 404 errors on routes like `/blog`.

## Solution: Manual Configuration in Render Dashboard

Since `_static.json` might not be working automatically, configure routing manually:

### Step 1: Go to Render Dashboard
1. Go to https://dashboard.render.com
2. Click on your **eqostack** static site service

### Step 2: Add Rewrite Rule
1. Go to **Settings** → **Headers**
2. Scroll down to **Redirects/Rewrites** section
3. Click **Add Redirect/Rewrite**
4. Configure:
   - **Source Path**: `/*`
   - **Destination**: `/index.html`
   - **Type**: **Rewrite** (not Redirect)
   - **Status Code**: Leave blank or use 200
5. Click **Save**

### Step 3: Verify _static.json
Make sure `_static.json` exists at the root of your repository with:
```json
{
  "root": "dist",
  "clean_urls": true,
  "routes": {
    "/**": "index.html"
  }
}
```

### Step 4: Redeploy
After adding the rewrite rule, Render should automatically redeploy, or you can manually trigger:
1. Go to **Manual Deploy** → **Deploy latest commit**

## Alternative: Check Service Type

Make sure your service is configured as:
- **Service Type**: Static Site (not Web Service)
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

## Test After Fix

After applying the rewrite rule:
- ✅ `/blog` should load
- ✅ `/products` should load
- ✅ All routes should work

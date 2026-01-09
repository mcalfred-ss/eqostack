# 🚨 IMMEDIATE FIX - Render Dashboard Configuration

## Quick Fix (Do This Now)

The `_static.json` file might not be working. You need to configure routing manually in Render:

### Steps:

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Click on your **eqostack** service

2. **Add Rewrite Rule**
   - Go to **Settings** tab
   - Scroll to **Headers** section
   - Look for **Redirects/Rewrites** or **Routes**
   - Click **Add Redirect/Rewrite** or **Add Route**

3. **Configure the Rewrite:**
   ```
   Source: /*
   Destination: /index.html
   Type: Rewrite (NOT Redirect)
   ```

4. **Save and Wait**
   - Click **Save**
   - Render will redeploy automatically
   - Wait 2-5 minutes for deployment

5. **Test**
   - Visit: https://eqostack.com/blog
   - Should work now!

## Why This Works

Render needs to know to serve `index.html` for all routes. The rewrite rule tells Render: "For any path that doesn't match a file, serve index.html instead."

This allows React Router to handle the routing on the client side.

## If You Don't See Rewrite Option

If your Render dashboard doesn't show rewrite options:
1. Check if service type is "Static Site" (not "Web Service")
2. Try removing and re-adding the custom domain
3. Contact Render support: support@render.com

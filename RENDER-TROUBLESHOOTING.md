# 🔍 Troubleshooting: Why eqostack.com Won't Load

Since your DNS is correctly pointing to `216.24.57.1` (Render's IP), the issue is likely with your Render service itself.

## Step 1: Check Render Service Status

1. Go to https://dashboard.render.com
2. Click on your **eqostack** service
3. Check the **Status** at the top:
   - ✅ **Live** = Service is running
   - ⚠️ **Sleeping** = Service is asleep (free tier)
   - ❌ **Failed** = Build or deployment failed
   - 🔄 **Building** = Currently deploying

## Step 2: Check Recent Deployments

1. In your Render service, go to the **Events** or **Logs** tab
2. Look at the most recent deployment:
   - ✅ **Deployed successfully** = Good
   - ❌ **Build failed** = Problem with build
   - ❌ **Deploy failed** = Problem with deployment

## Step 3: Common Issues & Fixes

### Issue A: Service is Sleeping (Free Tier)

**Symptom:** Service shows "Sleeping" status

**Solution:**
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Try accessing `https://eqostack.onrender.com` first to wake it up
- Then try `https://www.eqostack.com`
- **Permanent fix:** Upgrade to paid plan (starts at $7/month) to prevent sleeping

### Issue B: Build Failed

**Symptom:** Recent deployment shows "Build failed" in logs

**Check the build logs:**
1. Go to your service → **Logs** tab
2. Look for error messages
3. Common issues:
   - Missing dependencies
   - Build command error
   - Node version mismatch

**Fix:**
- Ensure `package.json` has all dependencies
- Verify build command: `npm run build`
- Check Node version matches (should be 18.x based on your config)

### Issue C: Domain Not Properly Linked

**Symptom:** Service works at `eqostack.onrender.com` but not at custom domain

**Check:**
1. Go to **Settings** → **Custom Domains**
2. Verify both domains show:
   - ✅ Domain Verified
   - ✅ Certificate Issued
3. If not verified:
   - Wait 15-30 minutes for DNS propagation
   - Check DNS records match exactly what Render shows
   - Try removing and re-adding the domain

### Issue D: Service Type Mismatch

**Symptom:** Service might be configured as "Web Service" instead of "Static Site"

**Check:**
1. Go to **Settings** → **Service Details**
2. Verify **Service Type** is **"Static Site"**
3. If it's "Web Service", you need to:
   - Create a new Static Site
   - Connect your GitHub repo
   - Set Build Command: `npm run build`
   - Set Publish Directory: `dist`

### Issue E: Routing Configuration

**Symptom:** Site loads but shows 404 on routes

**Check:**
- You have `_static.json` with routing config ✅ (this is correct)
- Ensure it's in the root of your repo
- Verify it's being deployed with your site

## Step 4: Test the Render Subdomain

1. Try accessing: `https://eqostack.onrender.com`
2. **If this works:** DNS/custom domain issue
3. **If this doesn't work:** Service/deployment issue

## Step 5: Manual Deployment Check

1. In Render dashboard, go to your service
2. Click **Manual Deploy** → **Deploy latest commit**
3. Watch the build logs
4. Wait for deployment to complete
5. Try accessing the site again

## Step 6: Verify Build Output

1. Check that `dist` folder exists in your repo
2. Verify `dist/index.html` exists
3. If not, run locally:
   ```bash
   npm run build
   ```
4. Commit and push the `dist` folder (if needed)

## Quick Diagnostic Checklist

- [ ] Service status is "Live" (not "Sleeping" or "Failed")
- [ ] Last deployment was successful
- [ ] `https://eqostack.onrender.com` works
- [ ] Both domains show "Domain Verified" and "Certificate Issued"
- [ ] Build logs show no errors
- [ ] Service type is "Static Site" (not "Web Service")
- [ ] Build command is `npm run build`
- [ ] Publish directory is `dist`

## Still Not Working?

1. **Check Render Status:** https://status.render.com
2. **Contact Render Support:** support@render.com
3. **Check DNS Propagation:** https://dnschecker.org (search for `eqostack.com` A record)
4. **Try from different network/device** (rule out local issues)

## Most Likely Cause

Based on your setup, the most common issue is:
- **Service is sleeping** (free tier) - First request takes time to wake up
- **Domain verification pending** - Wait 15-30 minutes after adding domain

Try accessing `https://eqostack.onrender.com` first to see if the service itself is working!


# Deployment Guide for HostAfrica

## Quick Steps to Deploy eqostack.com

### 1. Build Your Site

Run this command in your project directory:
```bash
npm run build
```

This creates a `dist` folder with all your production files.

### 2. Upload to HostAfrica

**Option A: Via cPanel File Manager**
1. Log into HostAfrica cPanel
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain's root folder)
4. Upload all files from the `dist` folder

**Option B: Via FTP**
1. Get FTP credentials from HostAfrica
2. Use FTP client (FileZilla, WinSCP, etc.)
3. Connect to your server
4. Upload all files from the `dist` folder to `public_html`

### 3. Configure Domain in HostAfrica

1. **Log into HostAfrica Client Area**: https://www.hostafrica.com/clientarea.php
2. Go to **Domains** → **My Domains**
3. Click **Manage DNS** for `eqostack.com`
4. Add/Update DNS records:

```
A Record:
- Name: @ (or blank)
- Value: [Your HostAfrica server IP - check your hosting package]

CNAME Record:
- Name: www
- Value: eqostack.com
```

### 4. Wait for DNS Propagation

- DNS changes can take 24-48 hours
- Check status at: https://dnschecker.org
- Search for `eqostack.com` and select "A" record

### 5. Verify SSL Certificate

If using HostAfrica hosting:
- Enable SSL/HTTPS in cPanel
- HostAfrica usually provides free SSL certificates
- Look for "SSL/TLS" or "Let's Encrypt" in cPanel

## Alternative: Deploy to Vercel/Netlify

If you prefer modern hosting:

1. **Deploy to Vercel:**
   ```bash
   npm i -g vercel
   vercel
   ```
   Then add `eqostack.com` as custom domain in Vercel dashboard

2. **Update DNS in HostAfrica:**
   - Get DNS records from Vercel
   - Update A/CNAME records in HostAfrica DNS management

## Troubleshooting

**Domain not resolving?**
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Verify domain is active in HostAfrica

**Site not loading?**
- Check files are in correct directory (`public_html`)
- Verify `index.html` is in root
- Check file permissions (should be 644 for files, 755 for folders)

**SSL/HTTPS issues?**
- Enable SSL in cPanel
- Wait for certificate to activate
- Clear browser cache


# 📊 How to Add Property in Google Search Console

## Step-by-Step Guide

### Step 1: Go to Google Search Console

1. Visit: **https://search.google.com/search-console**
2. Sign in with your Google account (use the account you want to manage the site with)

---

### Step 2: Add Your Property

1. On the Search Console homepage, click the **"Add Property"** button (top left)
2. You'll see two options:
   - **Domain** (for entire domain: `eqostack.com`)
   - **URL prefix** (for specific URL: `https://eqostack.com`)

**Choose: "URL prefix"** (recommended for most sites)

3. Enter your website URL: `https://eqostack.com`
4. Click **"Continue"**

---

### Step 3: Verify Ownership

Google needs to verify you own the website. Choose ONE of these methods:

#### **Method 1: HTML Tag (Easiest - Recommended)**

1. Google will show you a **meta tag** like this:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```

2. Copy the entire meta tag

3. Add it to your `index.html` file in the `<head>` section:
   ```html
   <head>
     <meta charset="UTF-8" />
     <link rel="icon" type="image/png" href="/eqostack logo.png" />
     <!-- Add the verification tag here -->
     <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
     ...
   </head>
   ```

4. Save the file, commit, and push to GitHub
5. Wait for Render to deploy (2-5 minutes)
6. Go back to Google Search Console
7. Click **"Verify"**

#### **Method 2: HTML File Upload**

1. Click **"HTML file"** option
2. Download the HTML file Google provides
3. Upload it to your `public/` folder
4. Commit and push to GitHub
5. Wait for deployment
6. Make sure the file is accessible at: `https://eqostack.com/google-verification-file.html`
7. Click **"Verify"** in Google Search Console

#### **Method 3: DNS Record** (If you have domain access)

1. Click **"DNS record"** option
2. Google will give you a TXT record to add
3. Go to your domain registrar (where you bought eqostack.com)
4. Add the TXT record to your DNS settings
5. Wait 24-48 hours for DNS propagation
6. Click **"Verify"** in Google Search Console

---

### Step 4: After Verification

Once verified, you'll see:
- ✅ **"Ownership verified"** message
- Your property will appear in the Search Console dashboard

---

### Step 5: Submit Your Sitemap

1. In Google Search Console, click on your property
2. Go to **"Sitemaps"** in the left sidebar
3. Under **"Add a new sitemap"**, enter: `sitemap.xml`
4. Click **"Submit"**
5. Google will start crawling your site

---

### Step 6: Request Indexing (Optional but Recommended)

1. Go to **"URL Inspection"** (left sidebar)
2. Enter your homepage: `https://eqostack.com`
3. Click **"Request Indexing"**
4. Repeat for important pages:
   - `https://eqostack.com/products`
   - `https://eqostack.com/about`
   - `https://eqostack.com/blog`

---

## Quick Visual Guide

```
Google Search Console
    ↓
Add Property
    ↓
URL prefix: https://eqostack.com
    ↓
Choose Verification Method
    ↓
    ├─→ HTML Tag (Add to index.html)
    ├─→ HTML File (Upload to public/)
    └─→ DNS Record (Add TXT record)
    ↓
Click "Verify"
    ↓
✅ Verified!
    ↓
Submit Sitemap: sitemap.xml
    ↓
Request Indexing for main pages
```

---

## Troubleshooting

### "Verification failed"
- Make sure the meta tag/file is in the `<head>` section
- Wait a few minutes after deploying
- Clear your browser cache
- Check that the file is accessible at the URL

### "Can't find verification file"
- Make sure file is in `public/` folder
- Check file name matches exactly (case-sensitive)
- Wait for deployment to complete
- Try accessing the file directly in browser

### "Property already exists"
- Someone else may have added it
- Check if you have access to that Google account
- You can add multiple owners to a property

---

## What Happens Next?

After verification:
- ✅ Google will start crawling your site
- ✅ You'll see data in Search Console (takes 1-3 days)
- ✅ Your site will start appearing in search results (1-4 weeks)
- ✅ You'll get reports on search performance

---

## Need Help?

- **Google Search Console Help**: https://support.google.com/webmasters
- **Verification Help**: https://support.google.com/webmasters/answer/9008080

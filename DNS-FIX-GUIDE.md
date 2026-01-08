# 🔧 DNS Configuration Fix for eqostack.com

## ✅ DNS Configuration is Correct!

If Render gave you `216.24.57.1` as the IP address, then your DNS is configured correctly:
- ✅ Root domain (`@`) A record points to `216.24.57.1` (Render's IP)
- ✅ `www` CNAME correctly points to `eqostack.onrender.com`

**The issue is NOT with DNS!** See `RENDER-TROUBLESHOOTING.md` for the real problem.

---

## If You Need to Update DNS Records (Reference Only)

### Step 1: Get Render's DNS Configuration

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your **eqostack** service
3. Go to **Settings** → **Custom Domains**
4. Click on **`eqostack.com`** (the root domain, not www)
5. Render will show you the DNS records you need to configure

### Step 2: Update DNS in HostAfrica

1. Log into your HostAfrica DNS management panel
2. Go to **Edit Zone - eqostack.com**
3. **Update the root domain A record:**
   - Find the record: `@` | `A` | `216.24.57.1`
   - Click the **pencil icon** (edit)
   - Change the **RDATA** value to Render's IP address
   - Render typically uses one of these IPs (check your Render dashboard for the exact one):
     - `216.24.57.4` (common Render IP)
     - Or the specific IP Render shows you
   - Save the record

### Step 3: Verify DNS Records

Your DNS records should look like this:

```
@ (root)     A       14400     [Render's IP address from dashboard]
www          CNAME   14400     eqostack.onrender.com
```

### Step 4: Wait for DNS Propagation

- DNS changes can take **15 minutes to 48 hours** to propagate
- Check propagation status at: https://dnschecker.org
- Search for `eqostack.com` and select "A" record
- Wait until it shows Render's IP globally

### Step 5: Verify in Render

1. Go back to Render dashboard
2. Check that both domains show:
   - ✅ Domain Verified
   - ✅ Certificate Issued
3. If verification fails, wait a bit longer for DNS propagation

## Alternative: Use CNAME for Root Domain (If Supported)

Some DNS providers support CNAME/ALIAS records for root domains. If HostAfrica supports this:

1. **Delete** the A record for `@`
2. **Add** a CNAME record:
   - Name: `@`
   - Type: `CNAME` (or `ALIAS`)
   - Value: `eqostack.onrender.com`

**Note:** Not all DNS providers support CNAME on root domains. If HostAfrica doesn't support it, use the A record method above.

## Quick Check Commands

After updating DNS, verify with these commands:

```bash
# Check A record
nslookup eqostack.com

# Check CNAME record
nslookup www.eqostack.com

# Check DNS propagation globally
# Visit: https://dnschecker.org
```

## Troubleshooting

**Still not working after 24 hours?**
1. Double-check the IP address in Render dashboard
2. Verify DNS records are saved correctly
3. Clear your browser cache
4. Try accessing from a different network/device
5. Check Render service status: https://status.render.com

**"Domain not verified" in Render?**
- Wait longer for DNS propagation (can take up to 48 hours)
- Ensure the A record exactly matches what Render shows
- Contact Render support if it persists


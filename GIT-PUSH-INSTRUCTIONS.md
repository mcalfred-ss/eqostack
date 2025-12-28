# How to Push Project to GitHub

## Quick Method (If Git is Installed)

### Option 1: Run the Batch Script
1. Double-click `push-to-github.bat` in your project folder
2. Follow the prompts

### Option 2: Manual Commands
Open Command Prompt or PowerShell in your project folder and run:

```bash
cd "d:\About WEBSITE\eqostack"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - eqostack website"

# Add remote
git remote add origin https://github.com/mcalfred-ss/eqostack.git

# Set branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## If Git is NOT Installed

### Install Git First:
1. Download: https://git-scm.com/download/win
2. Install with default settings
3. Restart your terminal
4. Then run the commands above

### OR Use GitHub Desktop (Easier):
1. Download: https://desktop.github.com/
2. Sign in with GitHub
3. Click "Add" → "Add Existing Repository"
4. Select: `d:\About WEBSITE\eqostack`
5. Click "Publish repository"

## After Pushing to GitHub

1. **Deploy to Render:**
   - Go to Render dashboard
   - Click "Static Site"
   - Connect your GitHub repository
   - Set Build Command: `npm run build`
   - Set Publish Directory: `dist`
   - Deploy!

2. **Add Custom Domain:**
   - In Render, go to your Static Site settings
   - Click "Custom Domains"
   - Add: `eqostack.com`
   - Copy DNS records from Render
   - Add DNS records in HostAfrica

## Troubleshooting

**"Git is not recognized"**
- Install Git: https://git-scm.com/download/win
- Restart terminal after installation

**"Repository not found"**
- Make sure the GitHub repo exists: https://github.com/mcalfred-ss/eqostack
- Check you have access to push

**"Authentication failed"**
- Use GitHub Personal Access Token instead of password
- Or use GitHub Desktop


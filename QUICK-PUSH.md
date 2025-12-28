# ⚡ QUICK PUSH TO GITHUB - 3 STEPS

## Step 1: Install Git (2 minutes)
Download and install: https://git-scm.com/download/win
- Just click "Next" through the installer
- Use default settings
- **Restart your terminal/VS Code after installation**

## Step 2: Run These Commands
Open Command Prompt or PowerShell in your project folder and paste:

```bash
cd "d:\About WEBSITE\eqostack"
git init
git add .
git commit -m "Initial commit - eqostack website"
git remote add origin https://github.com/mcalfred-ss/eqostack.git
git branch -M main
git push -u origin main
```

## Step 3: Authenticate
- If asked for username: Enter your GitHub username
- If asked for password: Use a **Personal Access Token** (not your password)
  - Get token: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Select scope: `repo`
  - Copy the token and use it as password

---

## 🚀 OR Use GitHub Desktop (EASIEST - No Commands!)

1. Download: https://desktop.github.com/
2. Sign in with GitHub
3. Click **"Add"** → **"Add Existing Repository"**
4. Browse to: `d:\About WEBSITE\eqostack`
5. Click **"Publish repository"**
6. Done! ✅

---

## After Pushing - Deploy to Render:

1. Go to Render dashboard
2. Click **"Static Site"**
3. Connect GitHub repository: `mcalfred-ss/eqostack`
4. Settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Deploy!
6. Add custom domain: `eqostack.com`


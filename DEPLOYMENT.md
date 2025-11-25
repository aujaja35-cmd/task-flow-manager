# Deployment Guide - Group 9 Simple Task Manager Application

This guide provides step-by-step instructions for deploying the Task Manager Application to GitHub Pages or other hosting platforms.

## 📦 Prerequisites

- Git installed on your computer
- GitHub account
- Node.js and npm installed

## 🚀 Deploying to GitHub Pages

### Step 1: Prepare Your Repository

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name your repository (e.g., `task-manager`)
   - Choose Public or Private
   - Do NOT initialize with README (we already have one)

2. **Connect your local project to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Group 9 Task Manager Application"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 2: Configure for GitHub Pages

1. **Install gh-pages package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.ts**
   
   Add the base configuration:
   ```typescript
   export default defineConfig(({ mode }) => ({
     base: '/YOUR_REPO_NAME/', // Replace with your repository name
     // ... rest of config
   }));
   ```

3. **Add deployment scripts to package.json**
   
   Add these scripts to your package.json:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

### Step 3: Deploy

1. **Build and deploy**
   ```bash
   npm run deploy
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Source", select "gh-pages" branch
   - Click Save

3. **Access your deployed app**
   - Your app will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
   - It may take a few minutes for the deployment to complete

### Step 4: Update and Redeploy

Whenever you make changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
npm run deploy
```

## 🌐 Alternative Deployment Options

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** to complete deployment

### Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build your app**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Netlify Drop (No CLI needed)

1. Build your app: `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag and drop the `dist` folder
4. Your app is now live!

## 🔧 Environment Variables

If you add backend features later, you'll need to configure environment variables:

### GitHub Pages
- Use repository secrets in GitHub Actions
- Or create a `.env.production` file (not committed to git)

### Vercel/Netlify
- Add environment variables in the dashboard
- Go to Settings > Environment Variables
- Add your variables there

## 📝 Custom Domain (Optional)

### GitHub Pages

1. **Add CNAME file**
   - Create a file named `CNAME` in the `public` folder
   - Add your domain: `yourdomain.com`

2. **Configure DNS**
   - Add an A record pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add a CNAME record pointing to `YOUR_USERNAME.github.io`

3. **Enable in GitHub**
   - Go to Settings > Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

## 🐛 Troubleshooting

### Blank page after deployment
- Check that the `base` path in `vite.config.ts` matches your repository name
- Ensure all assets are using relative paths

### 404 errors on refresh
- GitHub Pages doesn't support client-side routing by default
- Add a custom 404.html that redirects to index.html
- Or use hash routing instead of browser routing

### Build errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Check Node.js version: `node --version` (should be 16+)

## 📊 Monitoring

After deployment, monitor your application:

- Check the browser console for errors
- Test all features thoroughly
- Verify local storage works correctly
- Test on different devices and browsers

## 🔄 Continuous Deployment

For automatic deployments on every push:

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
```

## 📱 Testing Deployment

After deployment, test these features:

- [ ] Create a new task
- [ ] Edit an existing task
- [ ] Mark task as completed
- [ ] Delete a task
- [ ] Filter tasks
- [ ] Search functionality
- [ ] Check statistics update
- [ ] Verify data persists after refresh
- [ ] Test on mobile devices
- [ ] Test in different browsers

## 🎉 Success!

Your Task Manager Application is now live and accessible to anyone with the URL!

---

**Need help?** Check the main README.md for more information or contact the development team.

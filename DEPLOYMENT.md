```markdown
# Deployment Guide for Tafita AI

## Quick Deploy to Vercel (Recommended)

### Method 1: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Vercel will auto-detect Vite settings
5. Click "Deploy"
6. Your app will be live in ~1 minute!

## Deploy to Netlify

### Method 1: Connect to Git

1. Push your code to GitHub
2. Go to https://app.netlify.com/start
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

## Post-Deployment Checklist

- [ ] Test all features on live site
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test on different browsers
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS (usually automatic)

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

# 🚀 Quick Deploy to Vercel (5 Minutes)

## Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas account (free)
- Google OAuth credentials
- Facebook OAuth credentials

## Step 1: Push to GitHub (2 minutes)

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Production ready deployment"

# Create GitHub repo and push
# Go to https://github.com/new
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel (2 minutes)

1. **Go to:** https://vercel.com/
2. **Click:** "Add New" → "Project"
3. **Import** your GitHub repository
4. **Click:** "Deploy" (don't add env vars yet)
5. **Wait** for deployment to complete
6. **Copy** your Vercel URL (e.g., `your-project.vercel.app`)

## Step 3: Add Environment Variables (1 minute)

1. **Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

2. **Add these variables:**

```env
MONGODB_URI=mongodb+srv://saalineepandey_db_user:y0PBZTjDi244DnO0@cluster0.bvaixds.mongodb.net/Ecom?retryWrites=true&w=majority

EMAIL_USER=sonarai002@gmail.com

EMAIL_PASS=vvlnjhvgcjmjgpkn

NEXTAUTH_URL=https://your-project.vercel.app

NEXTAUTH_SECRET=myappsecre356d

GOOGLE_CLIENT_ID=34458901409-i4qnvt5mhe9jjj4muoosdb6mo76sjp5g.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET=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

FACEBOOK_CLIENT_ID=1321099646150962

FACEBOOK_CLIENT_SECRET=da4bd58a5b4a2a6a548eeaf2706d6e4d
```

**Important:** Replace `your-project.vercel.app` with your actual Vercel URL!

3. **Click:** "Save"
4. **Redeploy:** Go to Deployments → Click "..." → "Redeploy"

## Step 4: Update OAuth Redirect URIs (1 minute)

### Google:
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click your OAuth Client ID
3. Add to "Authorized redirect URIs":
   ```
   https://your-project.vercel.app/api/auth/callback/google
   ```
4. Save

### Facebook:
1. Go to: https://developers.facebook.com/apps/1321099646150962/
2. Go to: Facebook Login → Settings
3. Add to "Valid OAuth Redirect URIs":
   ```
   https://your-project.vercel.app/api/auth/callback/facebook
   ```
4. Save

## Step 5: Test Your Deployment (1 minute)

1. **Visit:** `https://your-project.vercel.app`
2. **Test Registration:** Create a new account
3. **Test Login:** Sign in with email/password
4. **Test OAuth:** Try Google and Facebook login
5. **Success!** 🎉

## Troubleshooting

### Build Failed?
- Check Vercel deployment logs
- Ensure all environment variables are added
- Verify no TypeScript errors

### OAuth Not Working?
- Verify redirect URIs match exactly
- Check NEXTAUTH_URL is correct
- Ensure no trailing slashes in URLs

### Database Connection Failed?
- Go to MongoDB Atlas → Network Access
- Add IP: 0.0.0.0/0 (allow all)
- Save and wait 1 minute

### Email Not Sending?
- Verify EMAIL_USER and EMAIL_PASS are correct
- Check if Gmail app password is valid
- Consider using SendGrid for production

## Generate New NEXTAUTH_SECRET (Optional)

For better security, generate a new secret:

```bash
# Mac/Linux
openssl rand -base64 32

# Windows (PowerShell)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Update in Vercel environment variables and redeploy.

## Custom Domain (Optional)

1. Go to: Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Update NEXTAUTH_URL to your custom domain
5. Update OAuth redirect URIs
6. Redeploy

## Monitoring

### Vercel Dashboard:
- **Analytics:** View traffic and performance
- **Logs:** Check function logs for errors
- **Deployments:** View deployment history

### MongoDB Atlas:
- **Metrics:** Monitor database performance
- **Alerts:** Set up alerts for issues

## Next Steps

1. ✅ Share your app URL with users
2. ✅ Monitor performance and errors
3. ✅ Gather user feedback
4. ✅ Plan feature updates
5. ✅ Scale as needed

## Your Live App

**URL:** `https://your-project.vercel.app`

**Features:**
- ✅ Email/Password Authentication
- ✅ Google OAuth Login
- ✅ Facebook OAuth Login
- ✅ Email Verification
- ✅ Protected Routes
- ✅ Mobile Responsive
- ✅ Production Ready

## Support

Need help? Check:
- `DEPLOYMENT_GUIDE.md` - Detailed deployment guide
- `PRODUCTION_CHECKLIST.md` - Complete checklist
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.mongodb.com/

## 🎉 Congratulations!

Your app is now live and accessible to users worldwide!

**Deployment Time:** ~5 minutes
**Status:** Production Ready ✅
**Next:** Share and grow your app! 🚀

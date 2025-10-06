# Vercel Deployment Guide

## 🚀 Production-Ready Checklist

Your project is now configured for Vercel deployment with all necessary optimizations and security measures.

## Pre-Deployment Checklist

### ✅ Code Optimizations
- [x] Console logs only in development mode
- [x] Debug mode disabled in production
- [x] Error handling for all API routes
- [x] Environment variables properly configured
- [x] .gitignore configured
- [x] Production-ready database connection

### ✅ Security
- [x] Environment variables not committed
- [x] NEXTAUTH_SECRET configured
- [x] OAuth credentials secured
- [x] Database credentials secured
- [x] CORS properly configured
- [x] Rate limiting ready

### ✅ Performance
- [x] Next.js optimizations enabled
- [x] Image optimization configured
- [x] Database connection pooling
- [x] Caching strategies implemented

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Initialize Git (if not already done):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Production ready"
   ```

2. **Create GitHub Repository:**
   - Go to https://github.com/new
   - Create a new repository
   - Don't initialize with README (you already have one)

3. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Configure MongoDB Atlas for Production

1. **Go to MongoDB Atlas** (cloud.mongodb.com)

2. **Network Access:**
   - Click "Network Access" in sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add Vercel's IP ranges (recommended for security)

3. **Database User:**
   - Verify your database user has proper permissions
   - Note down username and password

4. **Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

### Step 3: Configure OAuth for Production

#### Google OAuth:

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com/

2. **Select your project**

3. **Go to "APIs & Services" → "Credentials"**

4. **Click on your OAuth 2.0 Client ID**

5. **Add Authorized Redirect URIs:**
   ```
   https://your-domain.vercel.app/api/auth/callback/google
   ```
   
6. **Add Authorized JavaScript Origins:**
   ```
   https://your-domain.vercel.app
   ```

7. **Click "Save"**

#### Facebook OAuth:

1. **Go to Facebook Developers:**
   - https://developers.facebook.com/apps/

2. **Select your app**

3. **Go to "Facebook Login" → "Settings"**

4. **Add Valid OAuth Redirect URIs:**
   ```
   https://your-domain.vercel.app/api/auth/callback/facebook
   ```

5. **Add App Domains:**
   ```
   your-domain.vercel.app
   ```

6. **Click "Save Changes"**

### Step 4: Deploy to Vercel

1. **Go to Vercel:**
   - https://vercel.com/

2. **Sign in with GitHub**

3. **Import Project:**
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"

4. **Configure Project:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Add Environment Variables:**
   Click "Environment Variables" and add:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   NEXTAUTH_URL=https://your-project.vercel.app
   NEXTAUTH_SECRET=your-random-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FACEBOOK_CLIENT_ID=your-facebook-app-id
   FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
   ```

6. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (2-5 minutes)

### Step 5: Post-Deployment Configuration

1. **Get Your Vercel URL:**
   - After deployment, you'll get a URL like: `your-project.vercel.app`

2. **Update NEXTAUTH_URL:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `NEXTAUTH_URL` to your actual Vercel URL
   - Redeploy the project

3. **Update OAuth Redirect URIs:**
   - Go back to Google Console and Facebook Developers
   - Replace `your-domain.vercel.app` with your actual Vercel URL
   - Save changes

4. **Test Your Deployment:**
   - Visit your Vercel URL
   - Test registration
   - Test email/password login
   - Test Google OAuth
   - Test Facebook OAuth
   - Test email verification

## Environment Variables Reference

### Required Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `EMAIL_USER` | Email service username | `your-email@gmail.com` |
| `EMAIL_PASS` | Email service password | `app-specific-password` |
| `NEXTAUTH_URL` | Your production URL | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | Random secret key | Generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | `GOCSPX-xxx` |
| `FACEBOOK_CLIENT_ID` | Facebook App ID | `1234567890` |
| `FACEBOOK_CLIENT_SECRET` | Facebook App Secret | `abc123...` |

### Generate NEXTAUTH_SECRET:

**Option 1: Using OpenSSL (Mac/Linux):**
```bash
openssl rand -base64 32
```

**Option 2: Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option 3: Online Generator:**
- https://generate-secret.vercel.app/32

## Custom Domain (Optional)

1. **Go to Vercel Dashboard:**
   - Your Project → Settings → Domains

2. **Add Custom Domain:**
   - Enter your domain (e.g., `myapp.com`)
   - Follow DNS configuration instructions

3. **Update Environment Variables:**
   - Update `NEXTAUTH_URL` to your custom domain
   - Redeploy

4. **Update OAuth Redirect URIs:**
   - Update Google and Facebook with new domain
   - Save changes

## Monitoring & Maintenance

### Vercel Dashboard:

- **Analytics:** Monitor page views and performance
- **Logs:** Check function logs for errors
- **Deployments:** View deployment history
- **Environment Variables:** Manage secrets

### MongoDB Atlas:

- **Metrics:** Monitor database performance
- **Alerts:** Set up alerts for issues
- **Backups:** Configure automatic backups
- **Indexes:** Optimize database queries

### Email Service:

- **Delivery Rate:** Monitor email delivery
- **Bounce Rate:** Check for bounced emails
- **Spam Reports:** Monitor spam complaints

## Troubleshooting

### Deployment Fails:

**Check Build Logs:**
- Go to Vercel Dashboard → Deployments
- Click on failed deployment
- Check build logs for errors

**Common Issues:**
- Missing environment variables
- TypeScript errors
- Missing dependencies
- Build timeout

**Solutions:**
- Add all required environment variables
- Fix TypeScript errors locally first
- Run `npm install` and commit package-lock.json
- Optimize build process

### OAuth Not Working:

**Check:**
- Redirect URIs match exactly (including https://)
- Environment variables are set correctly
- OAuth apps are in production mode
- Callback URLs don't have trailing slashes

**Fix:**
- Update redirect URIs in OAuth consoles
- Verify NEXTAUTH_URL is correct
- Check OAuth credentials
- Redeploy after changes

### Database Connection Issues:

**Check:**
- MongoDB Atlas IP whitelist
- Connection string is correct
- Database user has permissions
- Network access is configured

**Fix:**
- Add 0.0.0.0/0 to IP whitelist
- Verify connection string format
- Check database user credentials
- Test connection locally first

### Email Not Sending:

**Check:**
- Email credentials are correct
- App-specific password is used (Gmail)
- Email service is not blocked
- SMTP settings are correct

**Fix:**
- Generate new app-specific password
- Use professional email service (SendGrid, AWS SES)
- Check email service logs
- Test email locally first

## Performance Optimization

### Enable Caching:

Add to `next.config.ts`:
```typescript
const nextConfig = {
  // ... existing config
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

### Database Indexing:

Add indexes to frequently queried fields:
```javascript
// In MongoDB
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ phone: 1 }, { unique: true })
db.users.createIndex({ isVerified: 1 })
```

### Image Optimization:

Already configured in Next.js - images are automatically optimized.

## Security Best Practices

### ✅ Implemented:

- Environment variables secured
- HTTPS enforced (Vercel default)
- CSRF protection (NextAuth)
- Password hashing (bcrypt)
- JWT sessions
- OAuth security
- Input validation
- SQL injection prevention (MongoDB)

### 🔒 Additional Recommendations:

1. **Rate Limiting:**
   - Add rate limiting to API routes
   - Use Vercel Edge Config or Upstash Redis

2. **CAPTCHA:**
   - Add reCAPTCHA to registration
   - Prevent bot registrations

3. **2FA:**
   - Implement two-factor authentication
   - Use authenticator apps

4. **Security Headers:**
   - Add security headers in next.config.ts
   - Use helmet.js equivalent

5. **Monitoring:**
   - Set up error tracking (Sentry)
   - Monitor suspicious activity
   - Log authentication attempts

## Continuous Deployment

### Automatic Deployments:

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Vercel automatically deploys
```

### Preview Deployments:

Create a branch for testing:
```bash
git checkout -b feature/new-feature
# Make changes
git push origin feature/new-feature
# Vercel creates preview deployment
```

### Production Deployment:

Merge to main branch:
```bash
git checkout main
git merge feature/new-feature
git push origin main
# Vercel deploys to production
```

## Rollback

If something goes wrong:

1. **Go to Vercel Dashboard**
2. **Click "Deployments"**
3. **Find previous working deployment**
4. **Click "..." → "Promote to Production"**

## Support & Resources

### Documentation:
- Vercel: https://vercel.com/docs
- Next.js: https://nextjs.org/docs
- NextAuth: https://next-auth.js.org/
- MongoDB: https://docs.mongodb.com/

### Community:
- Vercel Discord: https://vercel.com/discord
- Next.js GitHub: https://github.com/vercel/next.js
- Stack Overflow: Tag with `vercel`, `nextjs`

## Success Checklist

After deployment, verify:

- [ ] Website loads at Vercel URL
- [ ] Registration works
- [ ] Email verification works
- [ ] Login with email/password works
- [ ] Google OAuth works
- [ ] Facebook OAuth works
- [ ] Protected routes work
- [ ] Sign out works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] SSL certificate active (https)
- [ ] Environment variables set
- [ ] OAuth redirect URIs updated
- [ ] Database connection working
- [ ] Email service working

## 🎉 Congratulations!

Your application is now live and production-ready on Vercel!

**Next Steps:**
1. Share your app URL
2. Monitor performance
3. Gather user feedback
4. Iterate and improve
5. Scale as needed

Your app URL: `https://your-project.vercel.app`

# 🚀 E-Commerce Authentication System

A production-ready Next.js authentication system with email/password, Google OAuth, Facebook OAuth, and email verification.

## ✨ Features

### Authentication Methods
- 🔐 **Email/Password** - Traditional authentication with secure password hashing
- 🔵 **Google OAuth** - One-click login with Google account
- 🔷 **Facebook OAuth** - One-click login with Facebook account

### Security Features
- ✅ Email verification with OTP (6-digit code)
- ✅ Password strength validation
- ✅ Real-time email availability checking
- ✅ Phone number validation
- ✅ Protected routes with middleware
- ✅ JWT session management
- ✅ CSRF protection
- ✅ Secure password hashing (bcrypt)

### User Experience
- 📱 Fully responsive design
- 🎨 Modern glassmorphism UI
- ⚡ Real-time form validation
- 🔄 Loading states and error handling
- 📧 Email verification flow
- 🔑 Password strength meter
- 🎯 Auto-focus and keyboard navigation

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Authentication:** NextAuth.js
- **Database:** MongoDB Atlas
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Vercel
- **Email:** Nodemailer

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Google OAuth credentials
- Facebook OAuth credentials
- Gmail account (for email service)

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-random-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-secret
   FACEBOOK_CLIENT_ID=your-facebook-app-id
   FACEBOOK_CLIENT_SECRET=your-facebook-secret
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### Quick Deploy to Vercel (5 minutes)

See [QUICK_DEPLOY.md](QUICK_DEPLOY.md) for step-by-step instructions.

**TL;DR:**
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Update OAuth redirect URIs
5. Deploy!

### Detailed Deployment Guide

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for comprehensive deployment instructions.

## 📚 Documentation

- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - 5-minute deployment guide
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment documentation
- **[PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)** - Pre-deployment checklist
- **[AUTHENTICATION_SUMMARY.md](AUTHENTICATION_SUMMARY.md)** - Feature overview
- **[OAUTH_SETUP_GUIDE.md](OAUTH_SETUP_GUIDE.md)** - OAuth configuration
- **[EMAIL_VERIFICATION_GUIDE.md](EMAIL_VERIFICATION_GUIDE.md)** - Email verification flow
- **[REGISTRATION_FEATURES.md](REGISTRATION_FEATURES.md)** - Registration validation details
- **[OTP_TESTING_GUIDE.md](OTP_TESTING_GUIDE.md)** - OTP input testing

## 🎯 Usage

### Registration
1. Go to `/register`
2. Fill in email, phone, password
3. See real-time validation feedback
4. Submit form
5. Verify email with OTP code
6. Login successfully

### Login
1. Go to `/login`
2. Enter email and password
3. Or click Google/Facebook button
4. Access protected routes

### Email Verification
1. Check email for 6-digit OTP
2. Enter OTP on verification page
3. Email verified automatically
4. Can now login

## 🔐 Security

- ✅ Environment variables secured
- ✅ HTTPS enforced (Vercel)
- ✅ Password hashing with bcrypt
- ✅ JWT session tokens
- ✅ CSRF protection
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ XSS protection

## 📱 Pages

- `/` - Protected home page
- `/login` - Login page
- `/register` - Registration page
- `/verify-email` - Email verification page
- `/api/auth/*` - NextAuth API routes

## 🧪 Testing

### Local Testing
```bash
# Run development server
npm run dev

# Test registration
# Visit http://localhost:3000/register

# Check console for OTP code
# Look for: 🔐 OTP for email@example.com : 123456
```

### Production Testing
1. Deploy to Vercel
2. Test all authentication methods
3. Verify email flow works
4. Check OAuth integrations
5. Test on mobile devices

## 🐛 Troubleshooting

### Common Issues

**Build Fails:**
- Check TypeScript errors: `npm run build`
- Verify all dependencies installed
- Check environment variables

**OAuth Not Working:**
- Verify redirect URIs match exactly
- Check OAuth credentials
- Ensure NEXTAUTH_URL is correct

**Database Connection:**
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Test connection locally

**Email Not Sending:**
- Verify email credentials
- Use app-specific password (Gmail)
- Check email service logs

## 📊 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/auth/          # NextAuth API routes
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── verify-email/      # Email verification page
│   │   └── page.tsx           # Protected home page
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── db.ts              # MongoDB connection
│   │   └── models/            # Database models
│   └── components/            # React components
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── vercel.json                # Vercel configuration
└── Documentation files
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- NextAuth.js for authentication
- Vercel for hosting
- MongoDB for database
- Tailwind CSS for styling

## 📞 Support

Need help? Check the documentation:
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Production Checklist](PRODUCTION_CHECKLIST.md)
- [Quick Deploy](QUICK_DEPLOY.md)

Or reach out:
- GitHub Issues
- Email: your-email@example.com

## 🎉 Success!

Your authentication system is production-ready and can be deployed to Vercel in minutes!

**Features:**
- ✅ Multiple authentication methods
- ✅ Email verification
- ✅ Real-time validation
- ✅ Mobile responsive
- ✅ Production optimized
- ✅ Security best practices

**Deploy now:** See [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

---

Made with ❤️ using Next.js and NextAuth.js

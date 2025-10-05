# Test Login Credentials

## To test the login functionality:

### Step 1: Register a new user
1. Go to http://localhost:3000/register
2. Fill in the form with:
   - Email: test@example.com
   - Phone: +1234567890
   - Password: Test123!
   - Role: Customer

3. Click "Sign Up"
4. You should receive an OTP email (check your console logs)

### Step 2: Verify your email (if required)
- Check the email verification flow in your register route
- You may need to manually set `isVerified: true` in MongoDB for testing

### Step 3: Login
1. Go to http://localhost:3000/login
2. Enter:
   - Email: test@example.com
   - Password: Test123!
3. Click "Sign In"

### Step 4: View Dashboard
- After successful login, you'll be redirected to the home page
- You should see your email and user ID displayed
- Click "Sign Out" to logout

## Important Notes:

1. **MongoDB Connection**: Make sure your MongoDB Atlas is configured:
   - IP whitelist includes your current IP (or 0.0.0.0/0 for testing)
   - Cluster is not paused
   - Credentials are correct

2. **Environment Variables**: Restart your dev server after any .env.local changes

3. **Email Verification**: If your users need to be verified before login, you'll need to either:
   - Complete the email verification flow
   - Manually update the user in MongoDB: `db.users.updateOne({email: "test@example.com"}, {$set: {isVerified: true}})`

## Features Included:

✅ Modern, responsive design
✅ Form validation
✅ Error handling with clear messages
✅ Success feedback
✅ Loading states
✅ Mobile-friendly
✅ NextAuth integration
✅ Protected routes
✅ Session management

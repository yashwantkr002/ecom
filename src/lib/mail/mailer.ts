import nodemailer from "nodemailer";

// Generate modern OTP email HTML
const generateOTPEmailHTML = (otp: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Email Verification</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .email-container {
      max-width: 600px;
      width: 100%;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
      text-align: center;
      color: #ffffff;
    }
    
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    
    .header p {
      font-size: 16px;
      opacity: 0.95;
      font-weight: 400;
    }
    
    .content {
      padding: 48px 32px;
      text-align: center;
    }
    
    .greeting {
      font-size: 18px;
      color: #333333;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    
    .otp-box {
      background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
      border: 2px dashed #667eea;
      border-radius: 12px;
      padding: 32px;
      margin: 32px 0;
      position: relative;
    }
    
    .otp-label {
      font-size: 14px;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    
    .otp-code {
      font-size: 48px;
      font-weight: 700;
      color: #667eea;
      letter-spacing: 8px;
      font-family: 'Courier New', monospace;
      margin: 12px 0;
      text-shadow: 0 2px 4px rgba(102, 126, 234, 0.1);
    }
    
    .timer {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #fff;
      padding: 12px 24px;
      border-radius: 24px;
      margin-top: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .timer-icon {
      width: 20px;
      height: 20px;
      color: #f59e0b;
    }
    
    .timer-text {
      font-size: 14px;
      color: #333333;
      font-weight: 600;
    }
    
    .timer-duration {
      color: #f59e0b;
      font-weight: 700;
    }
    
    .info-text {
      font-size: 15px;
      color: #666666;
      line-height: 1.7;
      margin: 24px 0;
    }
    
    .warning-box {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      border-radius: 8px;
      margin-top: 32px;
      text-align: left;
    }
    
    .warning-box p {
      font-size: 14px;
      color: #92400e;
      margin: 0;
      line-height: 1.6;
    }
    
    .footer {
      background: #f9fafb;
      padding: 32px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer p {
      font-size: 13px;
      color: #6b7280;
      margin: 8px 0;
      line-height: 1.6;
    }
    
    .footer-links {
      margin-top: 16px;
    }
    
    .footer-links a {
      color: #667eea;
      text-decoration: none;
      margin: 0 12px;
      font-weight: 600;
      font-size: 13px;
    }
    
    /* Mobile responsive */
    @media only screen and (max-width: 600px) {
      body {
        padding: 0;
      }
      
      .email-container {
        border-radius: 0;
      }
      
      .header {
        padding: 32px 16px;
      }
      
      .header h1 {
        font-size: 24px;
      }
      
      .content {
        padding: 32px 20px;
      }
      
      .otp-code {
        font-size: 36px;
        letter-spacing: 4px;
      }
      
      .otp-box {
        padding: 24px 16px;
      }
      
      .footer {
        padding: 24px 16px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <h1>🔐 Email Verification</h1>
      <p>Secure your account with OTP</p>
    </div>
    
    <!-- Main Content -->
    <div class="content">
      <p class="greeting">
        Hello! We received a request to verify your email address. 
        Please use the following One-Time Password (OTP) to complete your verification.
      </p>
      
      <!-- OTP Box -->
      <div class="otp-box">
        <div class="otp-label">Your Verification Code</div>
        <div class="otp-code">${otp}</div>
        <div class="timer">
          <svg class="timer-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="timer-text">Valid for <span class="timer-duration">5 minutes</span></span>
        </div>
      </div>
      
      <p class="info-text">
        Enter this code in the verification page to continue. 
        If you didn't request this code, please ignore this email or contact our support team.
      </p>
      
      <!-- Warning Box -->
      <div class="warning-box">
        <p><strong>⚠️ Security Notice:</strong> Never share this code with anyone. Our team will never ask for your OTP via email or phone.</p>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p><strong>Need Help?</strong></p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <div class="footer-links">
        <a href="#">Help Center</a>
        <a href="#">Contact Support</a>
        <a href="#">Privacy Policy</a>
      </div>
      <p style="margin-top: 24px;">
        © ${new Date().getFullYear()} CityApp. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

// Main function to send OTP email
export const sendOTPEmail = async (
  to: string,
  otp: string,
  type: string = "Email Verification"
): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const subject =
      type === "Password Reset"
        ? "Your Password Reset Code"
        : "Your CityApp OTP Verification Code";

    const mailOptions = {
      from: `"CityApp" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`, // Plain text fallback
      html: generateOTPEmailHTML(otp), // Modern HTML template
    };

    await transporter.sendMail(mailOptions);
    return true; // ✅ success
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    return false; // ❌ failure
  }
};

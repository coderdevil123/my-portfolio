/**
 * lib/email.ts
 *
 * Handles sending emails using Nodemailer.
 * --------------------------------------------------------------------------
 * 1) sendEmail(...)   – sends an email using the configured transporter.
 * 2) emailTemplates   – returns HTML and text templates for
 *                      “thank-you” and “notification” messages.
 * 3) verifyEmailConnection(...) – verifies the SMTP connection.
 */

import nodemailer from "nodemailer"
import { config } from "dotenv"

config() // Load environment variables from .env file

export interface SendResult {
  success: boolean
  error?: string
  messageId?: string
  response?: string
}

// Email configuration with better error handling
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    // Add these for better Gmail compatibility
    tls: {
      rejectUnauthorized: false,
    },
  }

  console.log("SMTP Config:", {
    host: config.host,
    port: config.port,
    user: config.auth.user ? "***configured***" : "missing",
    pass: config.auth.pass ? "***configured***" : "missing",
  })

  return nodemailer.createTransport(config)
}

const transporter = createTransporter()

// Email templates with better formatting
export const emailTemplates = {
  thankYou: (name: string) => ({
    subject: "Thank you for reaching out! - Shubhang Mishra",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 20px; 
              background-color: #f8fafc; 
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff; 
              border-radius: 8px; 
              overflow: hidden; 
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
            }
            .header { 
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); 
              color: white; 
              padding: 30px; 
              text-align: center; 
            }
            .header h1 { 
              margin: 0; 
              font-size: 24px; 
              font-weight: 700; 
            }
            .content { 
              padding: 30px; 
            }
            .content h2 { 
              color: #1e293b; 
              margin-top: 0; 
              font-size: 20px; 
            }
            .content p { 
              margin-bottom: 15px; 
              color: #64748b; 
              font-size: 16px; 
            }
            .highlight { 
              background-color: #f0fdfa; 
              border-left: 4px solid #14b8a6; 
              padding: 15px; 
              margin: 20px 0; 
              border-radius: 4px; 
            }
            .footer { 
              background-color: #f8fafc; 
              padding: 20px; 
              text-align: center; 
              border-top: 1px solid #e2e8f0; 
            }
            .footer p { 
              margin: 5px 0; 
              color: #64748b; 
              font-size: 14px; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You, ${name}!</h1>
            </div>
            
            <div class="content">
              <h2>Message Received Successfully</h2>
              
              <p>Hi ${name},</p>
              
              <p>Thank you for reaching out through my portfolio website. I've received your message and appreciate you taking the time to contact me!</p>
              
              <div class="highlight">
                <p><strong>What's next?</strong></p>
                <p>I'll review your message and get back to you within 24-48 hours. Looking forward to connecting with you!</p>
              </div>
              
              <p>Best regards,<br><strong>Shubhang Mishra</strong><br>Full-Stack Developer & Cybersecurity Student</p>
            </div>
            
            <div class="footer">
              <p>Shubhang Mishra | Portfolio Contact</p>
              <p>Email: shubhangmishra094@gmail.com</p>
              <p>This is an automated response to your contact form submission.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${name},

Thank you for reaching out through my portfolio website! I've received your message and appreciate you taking the time to contact me.

I'll review your message and get back to you within 24-48 hours.

Best regards,
Shubhang Mishra
Full-Stack Developer & Cybersecurity Student

Email: shubhangmishra094@gmail.com
    `,
  }),

  notification: (name: string, email: string, message: string) => ({
    subject: `🔔 New Portfolio Contact: ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 20px; 
              background-color: #f8fafc; 
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff; 
              border-radius: 8px; 
              overflow: hidden; 
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
            }
            .header { 
              background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); 
              color: white; 
              padding: 25px; 
              text-align: center; 
            }
            .header h1 { 
              margin: 0; 
              font-size: 22px; 
              font-weight: 700; 
            }
            .content { 
              padding: 25px; 
            }
            .field { 
              margin-bottom: 20px; 
              padding: 15px; 
              background-color: #f8fafc; 
              border-radius: 6px; 
              border-left: 4px solid #14b8a6; 
            }
            .field-label { 
              font-weight: 600; 
              color: #1e293b; 
              margin-bottom: 5px; 
              font-size: 14px; 
              text-transform: uppercase; 
            }
            .field-value { 
              color: #475569; 
              font-size: 16px; 
            }
            .message-field { 
              background-color: #fefefe; 
              border: 1px solid #e2e8f0; 
              padding: 15px; 
              border-radius: 6px; 
              white-space: pre-wrap;
            }
            .timestamp { 
              text-align: center; 
              padding: 15px; 
              background-color: #f1f5f9; 
              color: #64748b; 
              font-size: 14px; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📧 New Contact Form Submission</h1>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value">${email}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Message</div>
                <div class="field-value message-field">${message}</div>
              </div>
            </div>
            
            <div class="timestamp">
              Received: ${new Date().toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZoneName: "short",
              })}
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

Received: ${new Date().toLocaleString()}
    `,
  }),
}

// Send email function with better error handling and logging
export async function sendEmail(to: string, template: { subject: string; html: string; text: string }) {
  try {
    console.log(`Attempting to send email to: ${to}`)
    console.log(`Subject: ${template.subject}`)

    const mailOptions = {
      from: `"Shubhang Mishra Portfolio" <${process.env.SMTP_USER}>`,
      to: to,
      subject: template.subject,
      text: template.text,
      html: template.html,
      // Add these headers to improve deliverability
      headers: {
        "X-Priority": "3",
        "X-MSMail-Priority": "Normal",
        Importance: "Normal",
      },
    }

    const info = await transporter.sendMail(mailOptions)

    console.log("✅ Email sent successfully!")
    console.log("Message ID:", info.messageId)
    console.log("Response:", info.response)

    return { success: true, messageId: info.messageId, response: info.response }
  } catch (error) {
    console.error("❌ Error sending email:", error)

    // Log specific error details
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }

    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Verify SMTP connection with detailed logging
export async function verifyEmailConnection() {
  try {
    console.log("🔍 Verifying SMTP connection...")
    await transporter.verify()
    console.log("✅ SMTP connection verified successfully")
    return { success: true, message: "SMTP connection verified" }
  } catch (error) {
    console.error("❌ SMTP connection failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      details: error,
    }
  }
}

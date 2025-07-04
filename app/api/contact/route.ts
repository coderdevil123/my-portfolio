import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, emailTemplates, verifyEmailConnection } from "@/lib/email"
import { connectToDB } from "@/lib/db"
import { Contact } from "@/models/Contact"


export async function POST(request: NextRequest) {
  try {
    console.log("📨 Contact form submission received")

    const body = await request.json()
    const { name, email, message } = body

    console.log("Form data:", {
      name,
      email: email ? "***provided***" : "missing",
      message: message ? "***provided***" : "missing",
    })

    // Validate required fields
    if (!name || !email || !message) {
      console.log("❌ Validation failed: Missing required fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("❌ Validation failed: Invalid email format")
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }
    await connectToDB()
    await Contact.create({ name, email, message })
    console.log("✅ Contact saved to MongoDB")
    // First verify SMTP connection
    const connectionTest = await verifyEmailConnection()
    if (!connectionTest.success) {
      console.error("❌ SMTP connection failed:", connectionTest.error)
      return NextResponse.json(
        {
          error: "Email service is currently unavailable. Please try again later.",
          details: connectionTest.error,
        },
        { status: 503 },
      )
    }

    console.log("✅ SMTP connection verified, proceeding with email sending...")

    // Send thank you email to the user
    console.log("📤 Sending thank you email to user...")
    const thankYouTemplate = emailTemplates.thankYou(name)
    const thankYouResult = await sendEmail(email, thankYouTemplate)

    // Send notification email to yourself
    console.log("📤 Sending notification email to admin...")
    const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || "shubhangmishra094@gmail.com"
    const notificationTemplate = emailTemplates.notification(name, email, message)
    const notificationResult = await sendEmail(notificationEmail, notificationTemplate)

    // Log results
    console.log("Thank you email result:", thankYouResult)
    console.log("Notification email result:", notificationResult)

    // Check if both emails were sent successfully
    if (thankYouResult.success && notificationResult.success) {
      console.log("✅ Both emails sent successfully!")
      return NextResponse.json({
        success: true,
        message: "Message sent successfully! Thank you for reaching out.",
        details: {
          thankYouSent: thankYouResult.success,
          notificationSent: notificationResult.success,
          thankYouMessageId: thankYouResult.messageId,
          notificationMessageId: notificationResult.messageId,
        },
      })
    } else {
      // Log errors but still return success to user if at least one email was sent
      console.error("⚠️ Some emails failed to send:", {
        thankYou: thankYouResult,
        notification: notificationResult,
      })

      return NextResponse.json({
        success: true,
        message: "Message received! I'll get back to you soon.",
        warning: "Some email notifications may have failed to send.",
        details: {
          thankYouSent: thankYouResult.success,
          notificationSent: notificationResult.success,
          errors: {
            thankYou: thankYouResult.success ? null : thankYouResult.error,
            notification: notificationResult.success ? null : notificationResult.error,
          },
        },
      })
    }
  } catch (error) {
    console.error("💥 Contact form error:", error)
    return NextResponse.json(
      {
        error: "Failed to process your message. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Handle GET requests for testing
export async function GET() {
  console.log("🔍 Testing contact API endpoint...")

  // Test SMTP connection
  const connectionTest = await verifyEmailConnection()

  return NextResponse.json({
    message: "Contact API is working",
    timestamp: new Date().toISOString(),
    smtpConnection: connectionTest,
    environment: {
      smtpHost: process.env.SMTP_HOST || "not configured",
      smtpPort: process.env.SMTP_PORT || "not configured",
      smtpUser: process.env.SMTP_USER ? "configured" : "not configured",
      smtpPassword: process.env.SMTP_PASSWORD ? "configured" : "not configured",
      notificationEmail: process.env.NOTIFICATION_EMAIL || "not configured",
    },
  })
}



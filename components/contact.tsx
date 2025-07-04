"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  const { ref: elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setStatusMessage("Sending your message...")

    try {
      console.log("Submitting form data:", {
        name: formData.name,
        email: formData.email,
        messageLength: formData.message.length,
      })

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      console.log("Response status:", response.status)
      console.log("Response headers:", Object.fromEntries(response.headers.entries()))

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text()
        console.error("Non-JSON response:", textResponse)
        throw new Error("Server returned non-JSON response")
      }

      const result = await response.json()
      console.log("Response data:", result)

      if (result.success) {
        setStatus("success")
        setStatusMessage(result.message || "Message sent successfully!")
        setFormData({ name: "", email: "", message: "" })

        // Show success message for 5 seconds
        setTimeout(() => {
          setStatus("idle")
          setStatusMessage("")
        }, 5000)
      } else {
        setStatus("error")
        setStatusMessage(result.error || "Failed to send message")

        // Show error message for 5 seconds
        setTimeout(() => {
          setStatus("idle")
          setStatusMessage("")
        }, 5000)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus("error")
      setStatusMessage("Network error. Please check your connection and try again.")

      // Show error message for 5 seconds
      setTimeout(() => {
        setStatus("idle")
        setStatusMessage("")
      }, 5000)
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="h-4 w-4 animate-spin" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Send className="h-4 w-4" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200"
      case "error":
        return "text-red-600 bg-red-50 border-red-200"
      case "loading":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return ""
    }
  }

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef}
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Ready to collaborate or have questions about my work? I'd love to hear from you. Let's discuss how we can
              work together!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div
              className={`transition-all duration-1000 ease-out delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-slate-300">
                      <Mail className="h-5 w-5 text-teal-400" />
                      <span>shubhangmishra094@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-4 text-slate-300">
                      <Phone className="h-5 w-5 text-teal-400" />
                      <span>+91-9056701395</span>
                    </div>
                    <div className="flex items-center space-x-4 text-slate-300">
                      <MapPin className="h-5 w-5 text-teal-400" />
                      <span>Patiala, Punjab, India</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">Connect With Me</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/in/shubhang-mishra-38b455284/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-110 group"
                    >
                      <Linkedin className="h-6 w-6 text-slate-300 group-hover:text-teal-400" />
                    </a>
                    <a
                      href="https://github.com/coderdevil123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-110 group"
                    >
                      <Github className="h-6 w-6 text-slate-300 group-hover:text-teal-400" />
                    </a>
                    <a
                      href="mailto:shubhangmishra094@gmail.com"
                      className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all duration-300 hover:scale-110 group"
                    >
                      <Mail className="h-6 w-6 text-slate-300 group-hover:text-teal-400" />
                    </a>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-3">Quick Response</h4>
                  <p className="text-slate-300 text-sm">
                    I typically respond to messages within 24-48 hours. For urgent matters, feel free to reach out via
                    phone or LinkedIn.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className={`transition-all duration-1000 ease-out delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">Send Me a Message</h3>

                  {/* Status Message */}
                  {statusMessage && (
                    <div className={`mb-6 p-4 rounded-lg border flex items-center space-x-2 ${getStatusColor()}`}>
                      {getStatusIcon()}
                      <span className="text-sm font-medium">{statusMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-teal-400 focus:ring-teal-400"
                        placeholder="Your full name"
                        disabled={status === "loading"}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-teal-400 focus:ring-teal-400"
                        placeholder="your.email@example.com"
                        disabled={status === "loading"}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-teal-400 focus:ring-teal-400 resize-none"
                        placeholder="Tell me about your project, questions, or how we can collaborate..."
                        disabled={status === "loading"}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {getStatusIcon()}
                        <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
                      </div>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

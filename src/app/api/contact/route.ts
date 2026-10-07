import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload in request." },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = body || {};

    // Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Please provide your name or organization." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Please provide your email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Please provide your message content." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address (e.g. name@domain.com)." },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = (subject && typeof subject === "string" ? subject.trim() : "") || "New Portfolio Inquiry";
    const trimmedMessage = message.trim();

    const user = (process.env.EMAIL_USER || process.env.GMAIL_USER || "").trim();
    // Google App Passwords often contain spaces when copied (e.g., "abcd efgh ijkl mnop")
    const pass = (
      process.env.EMAIL_PASS ||
      process.env.GMAIL_APP_PASSWORD ||
      process.env.EMAIL_PASSWORD ||
      ""
    ).replace(/\s+/g, "");

    const recipient = (process.env.EMAIL_TO || "jainabhiral7@gmail.com").trim();

    // If SMTP credentials are provided, send actual email via nodemailer
    if (user && pass) {
      try {
        const transportOptions = process.env.EMAIL_HOST
          ? {
              host: process.env.EMAIL_HOST,
              port: parseInt(process.env.EMAIL_PORT || "465", 10),
              secure: process.env.EMAIL_SECURE === "true" || process.env.EMAIL_PORT === "465",
              auth: {
                user,
                pass,
              },
              connectionTimeout: 10000,
              greetingTimeout: 10000,
            }
          : {
              service: "gmail",
              auth: {
                user,
                pass,
              },
              connectionTimeout: 10000,
              greetingTimeout: 10000,
            };

        const transporter = nodemailer.createTransport(transportOptions);

        const emailSubject = `[Portfolio] ${trimmedSubject} — from ${trimmedName}`;

        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>New Portfolio Message</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b0c; color: #f5f5f7; margin: 0; padding: 24px; }
                .container { max-width: 600px; margin: 0 auto; background-color: #121214; border: 1px solid #222226; border-radius: 16px; overflow: hidden; }
                .header { background: linear-gradient(135deg, #00e5ff 0%, #0070f3 100%); padding: 24px; color: #000; }
                .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
                .content { padding: 28px; }
                .field { margin-bottom: 18px; }
                .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888890; margin-bottom: 4px; font-family: monospace; }
                .value { font-size: 15px; color: #f5f5f7; font-weight: 500; }
                .message-box { background-color: #0c0c0e; border: 1px solid #222226; border-left: 3px solid #00e5ff; border-radius: 8px; padding: 16px; margin-top: 12px; font-size: 14px; line-height: 1.6; color: #d1d1d6; white-space: pre-wrap; }
                .footer { padding: 16px 28px; background-color: #0c0c0e; border-top: 1px solid #222226; font-size: 11px; color: #666; font-family: monospace; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>New Portfolio Dispatch</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Sender Name</div>
                    <div class="value">${trimmedName}</div>
                  </div>
                  <div class="field">
                    <div class="label">Sender Email</div>
                    <div class="value"><a href="mailto:${trimmedEmail}" style="color: #00e5ff; text-decoration: none;">${trimmedEmail}</a></div>
                  </div>
                  <div class="field">
                    <div class="label">Subject</div>
                    <div class="value">${trimmedSubject}</div>
                  </div>
                  <div class="field">
                    <div class="label">Message Content</div>
                    <div class="message-box">${trimmedMessage}</div>
                  </div>
                </div>
                <div class="footer">
                  Received via Abhiral Jain's Portfolio Contact Form • ${new Date().toUTCString()}
                </div>
              </div>
            </body>
          </html>
        `;

        const textContent = `
NEW PORTFOLIO DISPATCH
------------------------------------
From: ${trimmedName} (${trimmedEmail})
Subject: ${trimmedSubject}
Date: ${new Date().toUTCString()}

Message:
${trimmedMessage}
------------------------------------
        `;

        await transporter.sendMail({
          from: `"${trimmedName}" <${user}>`,
          replyTo: `"${trimmedName}" <${trimmedEmail}>`,
          to: recipient,
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        });

        return NextResponse.json({
          success: true,
          message: "Your message has been successfully delivered to Abhiral Jain!",
        });
      } catch (mailError: unknown) {
        console.error("NodeMailer SMTP Transmission Error:", mailError);
        const rawMsg = mailError instanceof Error ? mailError.message : String(mailError);
        
        let friendlyError = "Email transmission failed. Please try again or use direct email.";
        if (rawMsg.includes("Invalid login") || rawMsg.includes("535") || rawMsg.includes("Username and Password not accepted")) {
          friendlyError = "Gmail authentication failed. Please make sure you are using a 16-character Google App Password (not your normal Gmail password).";
        } else if (rawMsg.includes("ETIMEDOUT") || rawMsg.includes("ESOCKET")) {
          friendlyError = "Connection to the mail server timed out. Please check your network or try direct email.";
        }

        return NextResponse.json(
          {
            error: friendlyError,
            details: rawMsg,
            fallbackMailto: `mailto:${recipient}?subject=${encodeURIComponent(trimmedSubject)}&body=${encodeURIComponent(trimmedMessage + "\n\n— From: " + trimmedName + " (" + trimmedEmail + ")")}`,
          },
          { status: 502 }
        );
      }
    } else {
      // Development or unconfigured credentials mode
      console.log("==================================================");
      console.log("[NodeMailer: Contact Form Message Received]");
      console.log(`From    : ${trimmedName} <${trimmedEmail}>`);
      console.log(`Subject : ${trimmedSubject}`);
      console.log(`Message : ${trimmedMessage}`);
      console.log("[Info]  : To enable live email dispatch, add EMAIL_USER and EMAIL_PASS to your .env.local file.");
      console.log("==================================================");

      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Thank you! Your message has been received successfully.",
      });
    }
  } catch (globalError: unknown) {
    console.error("Contact API Server Error:", globalError);
    const msg = globalError instanceof Error ? globalError.message : "Internal Server Error";
    return NextResponse.json(
      { error: `Server error: ${msg}` },
      { status: 500 }
    );
  }
}

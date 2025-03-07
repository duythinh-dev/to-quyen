import { NextResponse } from "next/server";

// Thay thế các giá trị này bằng thông tin của bạn
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, service, message, email } = data;

    // Validate input
    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin bắt buộc" },
        { status: 400 }
      );
    }

    // Format message for Telegram
    const telegramMessage = `
🔔 New Contact Form Submission
👤 Tên: ${name}
📱 SĐT: ${phone}
💅 Dịch vụ: ${service}
💬 Tin nhắn: ${message || "Không có"}
🔗 Email: ${email || "Không có"}
    `.trim();

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
        }),
      }
    );

    if (!telegramResponse.ok) {
      throw new Error("Failed to send Telegram message");
    }

    // Send to Google Sheets using Google Apps Script Web App
    if (process.env.GOOGLE_APPS_SCRIPT_URL) {
      const sheetsResponse = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          service,
          message,
          email,
          timestamp: new Date().toISOString(),
        }),
      });

      console.log("Google Sheets response:", await sheetsResponse.text());

      if (!sheetsResponse.ok) {
        console.error("Failed to send to Google Sheets");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending form:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Không thể gửi form. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}

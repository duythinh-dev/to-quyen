import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, service, message, email } = data;

    // Log environment variables (sẽ hiện trong Vercel logs)
    console.log("Environment check:", {
      hasTelegramToken: !!process.env.TELEGRAM_BOT_TOKEN,
      hasChatId: !!process.env.TELEGRAM_CHAT_ID,
      hasGoogleUrl: !!process.env.GOOGLE_APPS_SCRIPT_URL,
    });

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

    // Gửi Telegram với nhiều logging hơn
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      console.log("Starting Telegram send...");

      const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
      console.log(
        "Telegram URL (partial):",
        telegramUrl.substring(0, 50) + "..."
      );

      const telegramResponse = await fetch(telegramUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMessage,
        }),
      });

      console.log("Telegram response status:", telegramResponse.status);
      const telegramData = await telegramResponse.json();
      console.log("Telegram API response:", telegramData);

      if (!telegramResponse.ok) {
        throw new Error(`Telegram API Error: ${JSON.stringify(telegramData)}`);
      }
    }

    // Gửi Google Sheets với logging
    if (process.env.GOOGLE_APPS_SCRIPT_URL) {
      console.log("Starting Google Sheets send...");
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

      console.log("Google Sheets response status:", sheetsResponse.status);
      const sheetsData = await sheetsResponse.text();
      console.log("Google Sheets response:", sheetsData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Full error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: "Không thể gửi form. Vui lòng thử lại sau.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

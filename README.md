# to-quyen

## Project Purpose

This repository contains the source code for **Tố Quyên**, a small business website built with Next.js and Tailwind CSS. The application showcases available services, promotions and galleries while providing a contact form for customers.

## Prerequisites

- Node.js 18 or later
- npm (comes with Node.js)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment variables**
   Create a `.env.local` file in the project root with the following variables:
   ```bash
   NEXT_PUBLIC_API_URL=<your backend API URL>
   # Optional variables used by the contact form
   TELEGRAM_BOT_TOKEN=<token>
   TELEGRAM_CHAT_ID=<chat id>
   GOOGLE_APPS_SCRIPT_URL=<script url>
   ```
3. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

To create a production build, run:
```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - start the development server with hot reload.
- `npm run build` - create an optimized production build.
- `npm start` - run the production build.
- `npm run lint` - run ESLint to check code quality.


🚀 Gemini Frontend Clone – Kuvaka Tech Assignment

A fully responsive, Gemini-style conversational AI interface built with Next.js App Router, Zustand, and Tailwind CSS. This project simulates a conversational AI experience with OTP login, chatroom management, typing indicators, image uploads, and more.
🔗 Live Demo : https://gemini-clone-one-gamma.vercel.app/login

👉 Click here to view the live app
📁 GitHub Repository
🧩 Features
✅ Authentication (OTP Flow)

    Phone number login with country code dropdown

    Country codes fetched from restcountries.com

    OTP simulated with setTimeout

    Form validation via React Hook Form + Zod

✅ Dashboard

    View list of chatrooms

    Create and delete chatrooms

    Toast confirmation on creation/deletion

    Debounced search bar to filter chatrooms

    Chatroom data saved in localStorage

✅ Chat Interface

    Chat UI with:

        User + Gemini messages

        Timestamps and AI typing indicator

        Simulated AI response using setTimeout + throttling

        Reverse infinite scroll (simulated with dummy data)

        Client-side pagination (20 messages/page)

    Image uploads using local preview (base64 or URL)

    Copy-to-clipboard on hover

✅ Global UX Features

    Mobile responsive (Tailwind CSS)

    Dark mode toggle

    Skeleton loaders for messages

    Toast notifications on major actions (OTP, message, etc.)

    Keyboard accessibility across key interactions

🛠 Tech Stack
Feature	Tech Used
Framework	Next.js 15 (App Router)
State Management	Zustand
Form Validation	React Hook Form + Zod
Styling	Tailwind CSS
Deployment	Vercel
Image Upload	base64 / preview URL
AI Simulation	setTimeout + throttling

🔄 Core Implementations
1. OTP Flow

    Validates phone number input with Zod schema

    Simulates OTP send/verify using setTimeout

    Persists login state in localStorage

2. Chatroom Management

    Zustand used for state

    Chatroom array stored in and read from localStorage

    Deletion confirmation via toast

3. AI Chat Behavior

    Simulated AI replies using throttled setTimeout

    Typing indicator shown before response

    Scrolls to latest message automatically

    Infinite scroll simulates older messages with dummy data

4. Image Upload

    Converts image to base64 or preview URL using FileReader

    Displays inline in chat bubble

5. Pagination

    Local pagination per chatroom (20 messages/page)

    Older messages fetched with infinite scroll trigger

6. Accessibility

    Keyboard-friendly forms

    Focus rings enabled

    Buttons and inputs fully accessible

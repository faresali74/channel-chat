# 💬 Channel Chat

A modern real-time chat application built with **React**, **TypeScript**, and **SignalR**, featuring secure JWT authentication, multiple chat channels, and Progressive Web App (PWA) support.

## 🚀 Features

- 🔐 JWT Authentication
- 👤 User Registration & Login
- 📁 Multiple Chat Channels
- ⚡ Real-time Messaging using SignalR
- 🔄 Automatic Reconnection
- 📱 Progressive Web App (PWA)
- 🎨 Responsive UI
- 🛡️ Protected Routes
- 🌐 REST API Integration
- ⚡ Fast build using Vite

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- SignalR Client
- Vite PWA Plugin

### Backend

- ASP.NET Core Web API
- SignalR
- JWT Authentication

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── chat/
│   └── ui/
│
├── Context/
│
├── pages/
│
├── routes/
│
├── services/
│   ├── api.ts
│   ├── authApi.ts
│   ├── channelApi.ts
│   ├── messageApi.ts
│   └── signalr.ts
│
├── types/
│
└── App.tsx
```

---

## 🔄 Real-Time Communication

The application uses **ASP.NET Core SignalR** for instant communication.

### Hub Events

### Client → Server

- JoinChannel
- SendMessage

### Server → Client

- JoinedChannel
- NewMessage
- UserJoined
- UserLeft

Automatic reconnection is enabled to recover from temporary network interruptions.

---

## 🔐 Authentication

Authentication is handled using JWT Access Tokens.

Every API request includes:

```http
Authorization: Bearer <access_token>
```

Protected pages are accessible only to authenticated users.

---

## 📱 Progressive Web App

The application supports:

- Installable on desktop & mobile
- Offline shell caching
- Fast loading
- App-like experience

Powered by:

- vite-plugin-pwa
- Workbox

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=https://your-api-url
VITE_SIGNALR_HUB_URL=https://your-api-url/channelHub
```

---

## ▶️ Getting Started

Clone the repository

```bash
git clone https://github.com/faresali74/channel-chat
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build production version

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

## 🌍 Deployment

Frontend is deployed on **Vercel**.

---

## 📸 Screenshots

> Add screenshots of:
>
> - Login
> - Register
> - Channel Selection
> - Chat Screen
> - PWA Installation

---

## ✨ Future Improvements

- Typing Indicator
- Read Receipts
- Message Editing
- Message Deletion
- Image Sharing
- File Upload
- Push Notifications
- Emoji Support
- Dark Mode

---

## 👨‍💻 Author

**Fares Ali**

- GitHub: https://github.com/faresali74
- LinkedIn: https://www.linkedin.com/in/fares-ali74

---

## 📄 License

This project is intended for educational and portfolio purposes.

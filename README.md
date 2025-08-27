# WhatsApp-Style AI Chat Interface

A modern WhatsApp-style chat interface for any AI bot, built with React and TypeScript. This project provides a complete, customizable chat interface that can be easily integrated with any AI service or webhook endpoint.

**Created by:** [Pinto Alpha Apps](https://www.alpha-apps.ae/) Team

## 🚀 Features

- **WhatsApp-Style Interface**: Familiar chat UI with authentic WhatsApp design elements
- **AI-Powered Assistant**: Intelligent conversation flow via webhook integration with any AI service
- **Voice Call Integration**: ElevenLabs ConvAI widget for voice interactions
- **Dynamic Sessions**: Unique session IDs generated on each page refresh
- **Real-time Messaging**: Instant responses with typing indicators and message status
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Toast Notifications**: User-friendly feedback system
- **Easy Customization**: Simple configuration for branding and integrations
- **Modern UI Components**: Built with shadcn/ui and Radix UI for accessibility

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom WhatsApp-inspired theme
- **UI Components**: shadcn/ui + Radix UI primitives
- **State Management**: React hooks with TanStack Query
- **Routing**: React Router DOM
- **Voice Integration**: ElevenLabs ConvAI
- **Backend Integration**: n8n webhook automation (or any webhook service)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd whatsapp-ai-chat-interface
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🏗 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── WhatsAppChat.tsx    # Main chat interface
├── hooks/
│   ├── use-mobile.tsx      # Mobile detection hook
│   └── use-toast.ts        # Toast notification system
├── lib/
│   └── utils.ts            # Utility functions
├── pages/
│   ├── Index.tsx           # Home page
│   └── NotFound.tsx        # 404 page
├── App.tsx                 # Main app component
├── main.tsx               # App entry point
└── index.css              # Global styles & theme
```

## 🎨 Customization

### Branding & Assets

1. **Logo**: Replace `/public/tayer.png` with your bot/company logo
2. **Favicon**: Replace `/public/favicon.ico` with your favicon
3. **App Title**: Update in `index.html` (line 7)
4. **Bot Name**: Update throughout the codebase to match your AI assistant's name

### Visual Customization

- **Colors**: Modify Tailwind classes in components (WhatsApp green: `#075e54`)
- **Welcome Message**: Update in `WhatsAppChat.tsx` (line 20)
- **Header Title**: Update in `WhatsAppChat.tsx` (line 181)

### Contact Information

Update the phone number and user ID in the webhook payload:

```typescript
body: JSON.stringify({
  messagebody: messageText,
  phone_Number: 'your-phone-number',  // Update this
  user_id: 'your-user-id',            // Update this
  sessionId: sessionId
})
```

### Design System Colors

- **Primary Color**: `#075e54` (WhatsApp header green)
- **Sent Messages**: `#dcf8c6` (light green)
- **Received Messages**: `#ffffff` (white)
- **Background**: `#e5ddd5` (WhatsApp chat background)

## ⚙️ Configuration

### 1. Webhook Setup

Update the webhook URL in `src/components/WhatsAppChat.tsx` (line 55):

```typescript
const response = await fetch('https://your-webhook-url.com/webhook/endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messagebody: messageText,
    phone_Number: 'your-phone-number',
    user_id: 'your-user-id',
    sessionId: sessionId  // ⚠️ This changes on each page refresh
  })
});
```

**Important:** The `sessionId` is automatically generated as `session_${timestamp}_${randomString}` and changes every time the page is refreshed, ensuring unique conversation sessions.

### 2. ElevenLabs Voice Integration

Update the ElevenLabs agent ID in `src/components/WhatsAppChat.tsx` (line 123):

```typescript
const handleCallClick = () => {
  const widgetElement = document.createElement('elevenlabs-convai');
  widgetElement.setAttribute('agent-id', 'your-elevenlabs-agent-id-here');
  // ... rest of the function
};
```

### 3. Webhook Payload Structure

Your webhook will receive the following JSON payload:

```json
{
  "messagebody": "User's message text",
  "phone_Number": "your-phone-number",
  "user_id": "your-user-id",
  "sessionId": "session_1724756891234_k3m9x7q2p"
}
```

**Response Handling:**
- The app accepts both JSON and plain text responses
- For JSON responses, it looks for `output`, `response`, or direct string values
- For plain text responses, it uses the text directly

## 📱 Features in Detail

### Chat Interface
- Real-time message exchange
- Typing indicators with animated dots
- Message timestamps
- Read receipts (double checkmarks)
- Auto-scroll to latest messages

### Voice Calls
- Click the phone icon to initiate voice conversation
- Powered by ElevenLabs ConvAI technology
- Seamless integration with the chat interface

### Responsive Design
- Mobile-first approach
- Optimized for various screen sizes
- Touch-friendly interface elements

## 🔒 Security Considerations

- All API communications use HTTPS
- User data is processed through secure n8n webhooks
- No sensitive information is stored locally

## 🚀 Deployment

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Ensure proper routing configuration for SPA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Open an issue in the GitHub repository
- **Documentation**: Check this README for configuration details
- **Community**: Join our discussions in the repository

## 🏢 About Pinto Alpha Apps

This project is developed and maintained by the **Pinto Alpha Apps** team. with love ❤️  https://www.alpha-apps.ae/ .

---

**⭐ If you find this project useful, please give it a star on GitHub!**

## 📋 Quick Setup Checklist

- [ ] Clone and install dependencies
- [ ] Update webhook URL in `WhatsAppChat.tsx`
- [ ] Replace logo (`/public/tayer.png`) with your bot logo
- [ ] Replace favicon (`/public/favicon.ico`)
- [ ] Update ElevenLabs agent ID (if using voice)
- [ ] Update bot branding and contact info
- [ ] Test webhook integration
- [ ] Build and deploy

**Note**: Remember that `sessionId` automatically changes on each page refresh for unique conversation tracking!

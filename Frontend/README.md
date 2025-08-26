# InteriorAI - AI-Powered Interior Design App

A beautiful React Native app that transforms room photos using AI to generate stunning interior design concepts.

## 🎨 Features

- **AI-Powered Design Generation**: Transform room photos into beautiful interior designs
- **Multiple Design Styles**: Choose from Modern, Minimalist, Bohemian, Rustic, Industrial, and Scandinavian styles
- **Before/After Comparison**: Interactive slider to compare original and AI-generated designs
- **Gallery Management**: Save and organize your generated designs
- **Guest Mode**: Use the app without creating an account
- **Usage Tracking**: Monitor your daily design generation limits
- **Beautiful UI**: Light, airy design with premium user experience

## 🏗️ Architecture

The app follows a three-tier architecture:

1. **Expo Client** - React Native frontend with Expo managed workflow
2. **Secure Proxy** - Serverless function for API key management and request validation
3. **OpenRouter Service** - AI model integration for image generation

### Key Technologies

- **Frontend**: React Native with Expo
- **State Management**: Zustand with persistence
- **Navigation**: Expo Router
- **Animations**: React Native Reanimated
- **Storage**: AsyncStorage for local data persistence
- **UI Components**: Custom design system with TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd InteriorAI/Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 App Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── forms/        # Form components
│   └── previews/     # Design preview components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and configurations
├── types/            # TypeScript type definitions
└── assets/           # Images, fonts, and other assets
```

## 🎯 Core Features

### Image Upload & Processing
- Uses `expo-image-picker` for native image selection
- Supports JPEG and PNG formats
- Client-side validation for file size and format
- Multipart/form-data transport for optimal performance

### Style Selection
- Horizontal scrollable card-based selector
- Visual thumbnails for each design style
- Real-time style information and tips

### AI Integration
- Secure proxy architecture for API key protection
- Multiple AI models for different design styles
- Fallback handling and error recovery
- Usage limiting for free tier users

### Before/After Comparison
- Draggable slider with smooth animations
- Real-time image comparison
- Built with React Native Reanimated for performance

## 🎨 Design System

The app uses a comprehensive design system with:

- **Colors**: Light theme with teal accent (#4FD1C5)
- **Typography**: Poppins for headings, Inter for body text
- **Spacing**: 8px grid system
- **Components**: Consistent card, button, and form components
- **Animations**: Smooth transitions and micro-interactions

## 🔒 Security Features

- API keys stored securely on proxy server
- Input sanitization and validation
- Rate limiting and abuse prevention
- Privacy-conscious logging

## 📊 State Management

The app uses Zustand for state management with:

- User data and authentication state
- Generated designs and gallery
- Loading states and error handling
- Local persistence with AsyncStorage

## 🚀 Deployment

### Development
- Uses mock API for development
- Hot reloading with Expo
- Debug tools and error reporting

### Production
- Configure proxy server URL in `src/lib/api.ts`
- Set up environment variables
- Build for app stores using Expo EAS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

Built with ❤️ using React Native and Expo

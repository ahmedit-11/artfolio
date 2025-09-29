# Artova - Portfolio Management System

## ملاحظة مهمة قبل تشغيل المشروع

**قبل تشغيل المشروع:**
1. نفّذ `npm install`
2. إذا ظهرت مشاكل بالإصدارات، احذف `package-lock.json` ثم نفّذ `npm install` مرة أخرى

## Project Overview

This is a React-based portfolio management system built with modern web technologies.

### Tech Stack

- **Frontend Framework:** React 18 with Vite
- **UI Library:** Radix UI + Tailwind CSS + shadcn/ui components
- **State Management:** Redux Toolkit with Redux Persist
- **HTTP Client:** Axios with global interceptors
- **Routing:** React Router DOM
- **Authentication:** Cookie-based token storage (js-cookie)
- **Real-time Chat:** Firebase Firestore
- **Notifications:** React Toastify
- **Icons:** Lucide React

### Key Features

- **Portfolio Management:** Create, edit, and showcase creative portfolios
- **User Authentication:** Secure login/register with JWT tokens
- **Social Features:** Follow users, like portfolios, comment system
- **Real-time Chat:** Firebase-powered messaging system
- **Admin Panel:** Comprehensive user and content management
- **Search & Discovery:** Advanced filtering and trending content
- **Dark/Light Theme:** System preference detection with manual toggle
- **Responsive Design:** Mobile-first approach with desktop optimization

### Installation

```bash
# Install dependencies
npm install

# If you encounter version conflicts:
# 1. Delete package-lock.json
# 2. Run npm install again
rm package-lock.json
npm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
├── pages/              # Page components organized by feature
├── store/              # Redux store with feature-based slices
├── contexts/           # React contexts (Chat, Notification)
├── utils/              # Utility functions
├── lib/                # External library configurations
└── styles/             # Global styles and Tailwind config
```

### Backend Integration

- **API Base URL:** `http://127.0.0.1:8000/api`
- **Authentication:** Laravel Sanctum with Bearer tokens
- **File Storage:** Laravel Storage with automatic URL conversion
- **Real-time Features:** Firebase for chat, Pusher for notifications

### Environment Setup

Make sure your backend Laravel API is running on `http://127.0.0.1:8000` before starting the frontend development server.

### Contributing

This project follows modern React patterns with:
- Redux Toolkit for state management
- Feature-based component organization
- Consistent error handling and loading states
- Comprehensive form validation
- Accessibility-first UI components


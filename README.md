# TinyLink - URL Shortener Web App

## 🌐 Live Demo  
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-brightgreen?style=for-the-badge)](https://tinylink-web-application.netlify.app/)


A modern, full-featured URL shortener web application similar to Bitly, built with Node.js, Express, React, and MongoDB.

## 🚀 Features

### Core Functionality
- **URL Shortening**: Convert long URLs into short, shareable links
- **Custom Codes**: Optional custom short codes (6-8 alphanumeric characters)
- **AI-Powered Codes**: Smart code generation using Google Gemini AI
- **Click Tracking**: Real-time click count and last clicked timestamp
- **Link Management**: View, search, sort, and delete links
- **Statistics**: Detailed stats for individual links
- **Health Check**: System monitoring endpoint with uptime and system info

### Technical Features
- **Modern Stack**: Node.js + Express backend, Vite React frontend
- **Database**: MongoDB with Mongoose ODM
- **Styling**: React Bootstrap with custom CSS
- **State Management**: React Context API
- **Form Validation**: Real-time client-side validation
- **Error Handling**: Comprehensive error handling with toast notifications
- **Responsive Design**: Mobile-friendly interface
- **ES6 Modules**: Modern JavaScript throughout

## 🏗️ Project Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & environment config
│   │   ├── constants/       # Status codes, messages, regex
│   │   ├── routes/          # API route handlers
│   │   ├── controllers/     # Business logic controllers
│   │   ├── services/        # Data access services
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── utils/           # Helper utilities
│   │   ├── app.js           # Express app setup
│   │   └── server.js        # Server entry point
│   ├── package.json
│   ├── .env
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── pages/           # Page components
    │   ├── services/        # API service layer
    │   ├── constants/       # App constants
    │   ├── context/         # React context providers
    │   ├── App.jsx          # Main app component
    │   └── main.jsx         # App entry point
    ├── public/
    │   └── favicon.ico
    ├── package.json
    └── vite.config.js
```

## 📋 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/healthz` | Health check endpoint |
| POST | `/api/links` | Create new short link |
| GET | `/api/links` | Get all links |
| GET | `/api/links/:code` | Get stats for specific link |
| DELETE | `/api/links/:code` | Delete link |
| GET | `/:code` | Redirect to original URL |

## 🎨 Pages & Routes

| Path | Purpose | Auth |
|------|---------|------|
| `/` | Dashboard (list, add, delete links) | Public |
| `/code/:code` | Stats page for individual link | Public |
| `/:code` | Redirect to original URL | Public |
| `/healthz` | Health check | Public |

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create `.env` files in both backend and frontend directories:

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tinylink
```

**Frontend (.env)**
```
# API Configuration
VITE_API_BASE=http://localhost:5000

# AI Configuration (optional - provides fallback if not set)
VITE_AI_API_KEY=your_google_gemini_api_key_here

# Application Branding (optional - defaults provided)
VITE_APP_NAME=TinyLink
VITE_APP_TAGLINE=Transform your URLs with ease.
VITE_APP_AUTHOR=Dilip Verma
```

### Centralized Configuration

The frontend uses a centralized configuration system in `src/config/config.js`. All environment variables and constants are managed from this single file, ensuring consistency across the entire application. Changes to API endpoints, branding, or UI settings only need to be made in one place.

**Key Benefits:**
- **Single Source of Truth**: All configuration in one file
- **Easy Maintenance**: Change API URLs, branding, or settings globally
- **Type Safety**: Consistent data types and validation
- **Environment Aware**: Automatic fallbacks for missing environment variables

## 🚀 Deployment

### Backend Deployment Options
- **Railway**: Connect to MongoDB Atlas
- **Render**: Free tier with persistent disks
- **Heroku**: Traditional Node.js hosting

### Frontend Deployment Options
- **Vercel**: Recommended for React apps
- **Netlify**: Alternative with great DX
- **Railway**: Full-stack deployment

## ✅ Requirements Compliance

### Core Features ✅
- [x] URL shortening with custom codes
- [x] HTTP 302 redirects with click tracking
- [x] Link deletion (returns 404 after deletion)
- [x] Dashboard with sortable/filterable table
- [x] Individual link statistics page
- [x] Health check endpoint

### Technical Requirements ✅
- [x] Node.js + Express backend
- [x] Vite React frontend
- [x] MongoDB database
- [x] URL validation before saving
- [x] Unique custom codes globally
- [x] Code format: [A-Za-z0-9]{6,8}
- [x] API endpoints match specification

### UI/UX Requirements ✅
- [x] Clean, thoughtful interface
- [x] Responsive design (mobile-friendly)
- [x] Loading, success, and error states
- [x] Form validation with friendly messages
- [x] Sortable/filterable tables
- [x] Truncated URLs with tooltips
- [x] Consistent styling and spacing
- [x] Professional polish

### API Compliance ✅
- [x] POST /api/links - Create link (409 for duplicates)
- [x] GET /api/links - List all links
- [x] GET /api/links/:code - Get link stats
- [x] DELETE /api/links/:code - Delete link
- [x] GET /healthz - Returns system details and uptime information

## 🎯 Advanced Features

- **React Tooltips**: Hover information for all interactive elements
- **SweetAlert2**: Beautiful confirmation dialogs
- **Toast Notifications**: Success/error feedback
- **Context API**: Centralized state management
- **ES6 Modules**: Modern JavaScript throughout
- **Responsive Tables**: Mobile-optimized data display
- **Real-time Validation**: Instant form feedback
- **Clipboard API**: One-click URL copying

## 🧪 Testing

### Manual Testing Checklist
- [x] Health check returns 200
- [x] Link creation works
- [x] Duplicate codes return 409
- [x] Redirects work and increment clicks
- [x] Deletion stops redirects (404)
- [x] UI meets all expectations
- [x] Responsive design works
- [x] Form validation functions
- [x] Search and sort work

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by popular URL shorteners like Bitly
- Uses open-source libraries and frameworks

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Note**: This application was built to meet all specified requirements and provides a production-ready URL shortener with modern UX patterns and clean architecture.
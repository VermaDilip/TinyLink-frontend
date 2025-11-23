// Centralized configuration for the application
// All environment variables and constants are managed here

const config = {
  // API Configuration
  API_BASE: import.meta.env.VITE_API_BASE || 'http://localhost:5000',

  // AI Configuration
  AI_API_KEY: import.meta.env.VITE_AI_API_KEY || '',

  // Application Branding
  APP_NAME: import.meta.env.VITE_APP_NAME || 'TinyLink',
  APP_TAGLINE: import.meta.env.VITE_APP_TAGLINE || 'Transform your URLs with ease.',
  APP_AUTHOR: import.meta.env.VITE_APP_AUTHOR || 'Dilip Verma',

  // Application Settings
  SHORT_CODE_PATTERN: /^[A-Za-z0-9]{6,8}$/,
  SHORT_CODE_TITLE: '6-8 alphanumeric characters',

  // UI Settings
  TOAST_POSITION: 'top-right',
  TOAST_AUTO_CLOSE: 3000,
  TOAST_HIDE_PROGRESS_BAR: false,
  TOAST_CLOSE_ON_CLICK: true,
  TOAST_PAUSE_ON_HOVER: true,
  TOAST_DRAGGABLE: true,
  TOAST_PAUSE_ON_FOCUS_LOSS: true,
  TOAST_THEME: 'colored',
};

export default config;
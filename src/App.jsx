/**
 * Main Application Component - TinyLink Frontend
 *
 * This is the root component of the TinyLink React application.
 * It sets up client-side routing and global UI components like toast notifications.
 *
 * Architecture:
 * - React Router for SPA navigation
 * - Centralized configuration for consistent behavior
 * - Toast notifications for user feedback
 * - Modular page components for different routes
 *
 * Routes:
 * - "/" - Dashboard: Main interface for creating and managing links
 * - "/code/:code" - Stats Page: Detailed analytics for a specific link
 * - "/:code" - Redirect Page: Handles short URL redirects (client-side routing)
 * - "*" - Error Page: Fallback for invalid routes
 *
 * Global Components:
 * - ToastContainer: Provides toast notifications throughout the app
 * - Router: Enables navigation between different pages
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import config from './config/config.js'
import Dashboard from './pages/Dashboard'
import StatsPage from './pages/StatsPage'
import RedirectPage from './pages/RedirectPage'
import ErrorPage from './pages/ErrorPage'

/**
 * Root App Component
 *
 * Sets up the application structure with routing and global components.
 * All application state and routing logic flows through this component.
 *
 * @returns {JSX.Element} The main application structure
 */
function App() {
  return (
    <Router>
      {/* Application Routes */}
      <Routes>
        {/* Dashboard - Main application interface */}
        <Route path="/" element={<Dashboard />} />

        {/* Statistics page for individual links */}
        <Route path="/code/:code" element={<StatsPage />} />

        {/* Short URL redirect handler (client-side routing) */}
        <Route path="/:code" element={<RedirectPage />} />

        {/* Fallback route for invalid URLs */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {/* Global Toast Notification Container */}
      <ToastContainer
        position={config.TOAST_POSITION}           // Toast position on screen
        autoClose={config.TOAST_AUTO_CLOSE}       // Auto-close delay in ms
        hideProgressBar={config.TOAST_HIDE_PROGRESS_BAR} // Hide progress bar
        newestOnTop                               // Show newest toasts on top
        closeOnClick={config.TOAST_CLOSE_ON_CLICK} // Close on click
        rtl={false}                               // Right-to-left support
        pauseOnFocusLoss={config.TOAST_PAUSE_ON_FOCUS_LOSS} // Pause when window loses focus
        draggable={config.TOAST_DRAGGABLE}        // Allow dragging to dismiss
        pauseOnHover={config.TOAST_PAUSE_ON_HOVER} // Pause on hover
        theme={config.TOAST_THEME}                // Toast theme (colored, light, dark)
      />
    </Router>
  )
}

export default App
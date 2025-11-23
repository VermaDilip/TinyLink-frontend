/**
 * Link Context - Global State Management for URL Links
 *
 * This React Context provides centralized state management for URL link operations
 * throughout the TinyLink application. It handles data fetching, mutations, and
 * state synchronization across all components that need link data.
 *
 * Features:
 * - Global links state accessible to all components
 * - Separate loading states for initial load vs. creation operations
 * - Toast notifications for user feedback
 * - Automatic data refetching after mutations
 * - Error handling with user-friendly toast messages
 *
 * Context Values:
 * - links: Array of all user links
 * - loading: Boolean for initial data loading state
 * - creating: Boolean for link creation loading state
 * - createLink: Function to create new links
 * - deleteLink: Function to delete existing links
 *
 * Usage:
 * ```jsx
 * import { useLinks } from '../context/LinkContext';
 *
 * function MyComponent() {
 *   const { links, createLink, loading, creating } = useLinks();
 *   // Use context values...
 * }
 * ```
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { linkApi } from '../services/linkApi';
import { MESSAGES } from '../constants/messages';

// Create the context object for sharing link state across components
const LinkContext = createContext();

/**
 * Custom hook to access the LinkContext
 *
 * Provides a clean API for components to access link-related state and functions.
 * Throws an error if used outside of a LinkProvider.
 *
 * @returns {Object} Link context values and functions
 */
export const useLinks = () => useContext(LinkContext);

/**
 * Link Provider Component - Wraps application components to provide link context
 *
 * This component manages all link-related state and provides it to child components
 * through React Context. It handles API calls, state updates, and user notifications.
 *
 * @param {Object} props - React component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Provider component wrapping children
 */
export const LinkProvider = ({ children }) => {
  // State for storing all user links
  const [links, setLinks] = useState([]);

  // Loading state for initial data fetch (shown on app load)
  const [loading, setLoading] = useState(true);

  // Loading state specifically for link creation operations
  const [creating, setCreating] = useState(false);

  /**
   * Fetches all links from the API and updates local state
   *
   * This function retrieves the complete list of user's links from the backend
   * and updates the local state. Called on component mount and shows toast
   * notifications for errors.
   *
   * @async
   * @returns {Promise<void>}
   */
  const fetchLinks = async () => {
    try {
      const response = await linkApi.getAllLinks();
      setLinks(response.data);
    } catch (err) {
      toast.error(MESSAGES.FAILED_TO_FETCH);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Creates a new short link
   *
   * Sends a request to create a new link with the provided URL and optional code.
   * Shows success/error toast notifications and refreshes the links list.
   *
   * @async
   * @param {string} originalUrl - The original URL to shorten
   * @param {string} [shortCode] - Optional custom short code
   * @returns {Promise<Object|undefined>} Created link data or undefined on error
   */
  const createLink = async (originalUrl, shortCode) => {
    setCreating(true);
    try {
      const response = await linkApi.createLink({ originalUrl, shortCode: shortCode || undefined });
      toast.success(MESSAGES.LINK_CREATED);
      // Refresh links after creation to show the new link
      const linksResponse = await linkApi.getAllLinks();
      setLinks(linksResponse.data);
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.error || MESSAGES.FAILED_TO_CREATE);
    } finally {
      setCreating(false);
    }
  };

  /**
   * Deletes a link by its short code
   *
   * Removes a link from the database and updates the local state.
   * Shows success/error toast notifications to the user.
   *
   * @async
   * @param {string} code - The short code of the link to delete
   * @returns {Promise<void>}
   */
  const deleteLink = async (code) => {
    try {
      await linkApi.deleteLink(code);
      toast.success(MESSAGES.LINK_DELETED);
      // Refresh links after deletion to remove from UI
      const response = await linkApi.getAllLinks();
      setLinks(response.data);
    } catch (err) {
      toast.error(MESSAGES.FAILED_TO_DELETE);
    }
  };

  // Fetch links when component mounts (initial data load)
  useEffect(() => {
    fetchLinks();
  }, []);

  // Provide context values to child components
  return (
    <LinkContext.Provider value={{
      links,
      loading,
      creating,
      createLink,
      deleteLink,
    }}>
      {children}
    </LinkContext.Provider>
  );
};
/**
 * AI Service - Google Gemini Integration for Smart Alias Generation
 *
 * This service provides AI-powered short code generation using Google Gemini AI.
 * It analyzes the provided URL and generates contextually relevant, memorable aliases.
 *
 * Features:
 * - Intelligent code generation based on URL content
 * - Fallback to random generation if AI is unavailable
 * - Length validation (6-8 characters as per spec)
 * - Error handling with graceful degradation
 *
 * Dependencies:
 * - @google/genai: Google Gemini AI SDK
 * - Centralized config for API key management
 *
 * Usage:
 * - Called when users don't provide custom codes
 * - Provides smart alternatives to random strings
 * - Enhances user experience with relevant codes
 */

import { GoogleGenAI } from "@google/genai";
import config from '../config/config.js';

// Retrieve API key from centralized configuration
const apiKey = config.AI_API_KEY;

/**
 * Generates a smart, contextually relevant short alias using AI
 *
 * This function uses Google Gemini AI to analyze the provided URL and generate
 * a memorable, relevant short code. If AI is unavailable, it falls back to
 * random code generation.
 *
 * AI Prompt Strategy:
 * - Analyzes URL content and structure
 * - Generates codes that relate to the URL's purpose
 * - Ensures codes are memorable and relevant
 * - Maintains required length constraints (6-8 chars)
 *
 * @async
 * @param {string} url - The original URL to generate an alias for
 * @returns {Promise<string>} A 6-8 character alphanumeric short code
 * @throws {Error} If AI generation fails and no fallback is available
 *
 * @example
 * // For "https://github.com/user/repo"
 * generateSmartAlias("https://github.com/user/repo") // Returns: "gitrepo"
 *
 * @example
 * // For "https://youtube.com/watch?v=123"
 * generateSmartAlias("https://youtube.com/watch?v=123") // Returns: "ytvideo"
 */
export const generateSmartAlias = async (url) => {
  // Check if AI API key is configured
  if (!apiKey) {
    console.warn("No API Key found for Gemini");
    // Fallback to random generation if no API key is present
    return Math.random().toString(36).substring(2, 8);
  }

  try {
    // Initialize Google Gemini AI client
    const ai = new GoogleGenAI({ apiKey });

    // Craft a detailed prompt for the AI to generate relevant aliases
    const prompt = `
      I need a short, memorable, alphanumeric alias (6-8 characters) for this URL: ${url}.
      It should be relevant to the content of the URL if possible.
      Only return the code itself, nothing else. No markdown, no explanation.
      Example: for "https://google.com/docs/pricing" return "gdocs01" or "pricing".
    `;

    // Make API call to Gemini AI
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    // Extract and clean the AI-generated response
    let alias = response.text?.trim() || '';

    // Remove any non-alphanumeric characters that might have slipped through
    alias = alias.replace(/[^A-Za-z0-9]/g, '');

    // Enforce length constraints from application specifications
    if (alias.length < 6) alias = alias.padEnd(6, 'x');
    if (alias.length > 8) alias = alias.substring(0, 8);

    return alias;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Failed to generate AI alias:", error);
    // Re-throw error to allow calling code to handle fallback
    throw new Error("AI generation failed");
  }
};
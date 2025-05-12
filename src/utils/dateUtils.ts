/**
 * Utility functions for handling dates in the application
 */

/**
 * Returns the current date in ISO format (YYYY-MM-DD)
 * Used for sitemap.xml lastmod and meta tags
 */
export const getCurrentDateISO = (): string => {
  const date = new Date();
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
};

/**
 * Returns the current date and time in ISO format
 * Used for og:updated_time meta tags
 */
export const getCurrentDateTimeISO = (): string => {
  return new Date().toISOString();
};

/**
 * Returns the current date in a human-readable format
 * Example: June 15, 2023
 */
export const getFormattedDate = (): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date().toLocaleDateString('en-US', options);
};

/**
 * Content freshness configuration
 * Used to track when content was last updated
 */
export const contentLastUpdated = {
  home: getCurrentDateISO(),
  compress: getCurrentDateISO(),
  puzzle: getCurrentDateISO(),
  privacy: getCurrentDateISO(),
  terms: getCurrentDateISO(),
  thankYou: getCurrentDateISO(),
};

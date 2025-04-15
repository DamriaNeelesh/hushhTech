/**
 * Date formatter utility functions for consistent date formatting across the application
 */

/**
 * Returns a day number with appropriate ordinal suffix
 * @param day The day number
 * @returns The day with ordinal suffix (e.g., 1st, 2nd, 3rd, 4th)
 */
export const getDayWithOrdinal = (day: number): string => {
  return day + (
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th"
  );
};

/**
 * Month names in abbreviated format
 */
export const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Month names in full format
 */
export const MONTH_NAMES_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Parses a date string specifically in the DD/MM/YYYY format used by the API
 * Also handles ISO format YYYY-MM-DD for backward compatibility
 * 
 * @param dateString The date string to parse (expected format: "15/4/2025" or "15/4/2025 00:50")
 * @returns A Date object or null if parsing fails
 */
export const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  
  try {
    // Handle DD/MM/YYYY format (the API's format)
    if (dateString.includes('/')) {
      // If there's a time component, extract just the date part
      const datePart = dateString.split(' ')[0];
      const parts = datePart.split('/');
      
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JS Date
        const year = parseInt(parts[2], 10);
        
        // Validate the components
        if (
          !isNaN(day) && !isNaN(month) && !isNaN(year) &&
          day >= 1 && day <= 31 &&
          month >= 0 && month <= 11 &&
          year >= 1000 && year <= 9999
        ) {
          return new Date(year, month, day);
        }
      }
    }
    
    // Backward compatibility for YYYY-MM-DD format
    else if (dateString.includes('-') && dateString.split('-').length === 3) {
      const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
      if (
        !isNaN(day) && !isNaN(month) && !isNaN(year) &&
        day >= 1 && day <= 31 &&
        month >= 1 && month <= 12 &&
        year >= 1000 && year <= 9999
      ) {
        return new Date(year, month - 1, day); // Month is 0-indexed in JS Date
      }
    }
    
    // Last resort fallback to direct parsing
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date;
    }
    
    console.error('Unable to parse date:', dateString);
    return null;
  } catch (error) {
    console.error('Error parsing date:', error, dateString);
    return null;
  }
};

/**
 * Formats a date string to "7th Apr '25" format
 * @param dateString The date string to format (expected format: "15/4/2025")
 * @returns Formatted date string
 */
export const formatShortDate = (dateString: string): string => {
  if (!dateString) return 'Date unavailable';
  
  try {
    const date = parseDate(dateString);
    
    // Check if date is valid
    if (!date || isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return 'Invalid date';
    }
    
    // Don't show future year - if date is in the future, adjust to current year
    const currentYear = new Date().getFullYear();
    if (date.getFullYear() > currentYear) {
      date.setFullYear(currentYear);
    }
    
    const dayOrdinal = getDayWithOrdinal(date.getDate());
    const month = MONTH_NAMES_SHORT[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    
    return `${dayOrdinal} ${month} '${year}`;
  } catch (error) {
    console.error('Error formatting date:', error, dateString);
    return 'Date unavailable';
  }
};

/**
 * Formats a date string to "7th April 2025" format
 * @param dateString The date string to format (expected format: "15/4/2025")
 * @returns Formatted date string
 */
export const formatLongDate = (dateString: string): string => {
  if (!dateString) return 'Date unavailable';
  
  try {
    const date = parseDate(dateString);
    
    // Check if date is valid
    if (!date || isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return 'Invalid date';
    }
    
    // Don't show future year - if date is in the future, adjust to current year
    const currentYear = new Date().getFullYear();
    if (date.getFullYear() > currentYear) {
      date.setFullYear(currentYear);
    }
    
    const dayOrdinal = getDayWithOrdinal(date.getDate());
    const month = MONTH_NAMES_FULL[date.getMonth()];
    
    return `${dayOrdinal} ${month} ${date.getFullYear()}`;
  } catch (error) {
    console.error('Error formatting date:', error, dateString);
    return 'Date unavailable';
  }
}; 
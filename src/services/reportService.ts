import axios from 'axios';

// Define the base URL for the Aloha Funds Report API
const REPORTS_API_BASE_URL = 'https://spmxyqxjqxcyywkapong.supabase.co/rest/v1';

// The API key for the Aloha Funds Report API
const REPORTS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbXh5cXhqcXhjeXl3a2Fwb25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTYwNDIsImV4cCI6MjA2MDI5MjA0Mn0._C6lZcTubk2VuwDKC2uDOsiFFPaKRiEJSqBjtGpm99E';

// Define storage bucket URLs
export const STORAGE_BUCKETS = {
  IMAGES: 'https://spmxyqxjqxcyywkapong.supabase.co/storage/v1/object/public/alohafundsreport-images',
  VIDEOS: 'https://spmxyqxjqxcyywkapong.supabase.co/storage/v1/object/public/alohafundsreport-videos'
};

/**
 * Report interface that matches the API response structure
 */
export interface Report {
  id: string;                 // UUID of the report
  title: string;              // Report title (required)
  subtitle: string;           // Report subtitle
  date: string;               // Report date in "DD/M/YYYY HH:mm" format (e.g., "17/4/2025 13:55")
  time: string;               // Report time in "HH:mm" format (e.g., "13:55")
  description: string;        // Detailed report description
  image: string;              // Primary image URL (first image from image_urls)
  image_urls: string[];       // Array of all image URLs
  video?: string;             // Deprecated: JSON string of video data (kept for backward compatibility)
  video_urls: string[];       // Array of all video URLs (replaces deprecated 'video' field)
  status?: string;            // Report status (default: "pending")
  is_public?: boolean;        // Whether the report is public (default: false)
  created_at: string;         // UTC timestamp of creation
  updated_at: string;         // UTC timestamp of last update
}

/**
 * Fetches all reports from the Aloha Funds Report API
 * @returns Promise that resolves to an array of Report objects
 */
export const getAllReports = async (): Promise<Report[]> => {
  try {
    console.log('Fetching all reports from Aloha Funds Report API...');
    
    // Use the exact endpoint format from the API documentation
    // API Key must be sent as a query parameter per documentation
    const response = await fetch(
      `${REPORTS_API_BASE_URL}/reports?select=*&order=date.desc,time.desc&apikey=${REPORTS_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API request failed with status ${response.status}: ${response.statusText}`);
      console.error('Error details:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Successfully fetched reports data, count:', data?.length || 0);
    
    // Handle empty response
    if (!data || !Array.isArray(data)) {
      console.log('Empty or invalid response:', data);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    // Return empty array instead of throwing to prevent UI from breaking
    return [];
  }
};

/**
 * Fetches a single report by ID from the Aloha Funds Report API
 * @param id The unique identifier of the report
 * @returns Promise that resolves to a Report object or null if not found
 */
export const getReportById = async (id: string): Promise<Report | null> => {
  if (!id) {
    console.error('Invalid report ID provided');
    return null;
  }
  
  try {
    console.log(`Fetching report with ID: ${id} from Aloha Funds Report API...`);
    
    // Use the exact endpoint format from the API documentation
    // API Key must be sent as a query parameter per documentation
    const response = await fetch(
      `${REPORTS_API_BASE_URL}/reports?id=eq.${id}&select=*&apikey=${REPORTS_API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Response status for single report:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API request failed with status ${response.status}: ${response.statusText}`);
      console.error('Error details:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Report data received:', data);
    
    if (data && Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    
    console.warn(`Report with ID ${id} not found`);
    return null;
  } catch (error) {
    console.error(`Error fetching report with ID ${id}:`, error);
    return null;
  }
}; 
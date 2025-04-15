import axios from 'axios';

// Define the base URL for the reports API - this is a separate Supabase instance from the main app
const REPORTS_API_BASE_URL = 'https://spmxyqxjqxcyywkapong.supabase.co/rest/v1';

// The API key for the reports Supabase instance - Updated with the correct key
const REPORTS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbXh5cXhqcXhjeXl3a2Fwb25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTYwNDIsImV4cCI6MjA2MDI5MjA0Mn0._C6lZcTubk2VuwDKC2uDOsiFFPaKRiEJSqBjtGpm99E';

export interface Report {
  id: string;
  title: string;
  subtitle: string;
  date: string; // YYYY-MM-DD
  time: string;
  description: string;
  image: string;
  image_urls: string[];
  video: string; // JSON string
  video_urls: string[];
  created_at: string;
  updated_at: string;
}

/**
 * Fetches all reports from the API
 * @returns Promise that resolves to an array of Report objects
 */
export const getAllReports = async (): Promise<Report[]> => {
  try {
    // Using the exact format from the example with updated API key
    console.log('Attempting to fetch reports with updated API key...');
    const response = await fetch(
      `${REPORTS_API_BASE_URL}/reports?select=*&order=date.desc,time.desc`,
      {
        headers: {
          'apikey': REPORTS_API_KEY,
          'Authorization': `Bearer ${REPORTS_API_KEY}` // Adding both header formats for maximum compatibility
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
 * Fetches a single report by ID
 * @param id The unique identifier of the report
 * @returns Promise that resolves to a Report object or null if not found
 */
export const getReportById = async (id: string): Promise<Report | null> => {
  try {
    console.log(`Fetching report with ID: ${id} using updated API key...`);
    // Using the exact format from the example with updated API key
    const response = await fetch(
      `${REPORTS_API_BASE_URL}/reports?id=eq.${id}&select=*`,
      {
        headers: {
          'apikey': REPORTS_API_KEY,
          'Authorization': `Bearer ${REPORTS_API_KEY}` // Adding both header formats for maximum compatibility
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
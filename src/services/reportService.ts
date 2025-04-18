// Define storage bucket URLs for Supabase
export const STORAGE_BUCKETS = {
  IMAGES: 'https://gsqmwxqgqrgzhlhmbscg.supabase.co/storage/v1/object/public',
  VIDEOS: 'https://gsqmwxqgqrgzhlhmbscg.supabase.co/storage/v1/object/public',
  S3: 'https://gsqmwxqgqrgzhlhmbscg.supabase.co/storage/v1/s3',
  WEBSITE: 'https://gsqmwxqgqrgzhlhmbscg.supabase.co/storage/v1/object/public/website'
};

/**
 * Report interface that matches the API response structure
 * Kept for type compatibility but will be removed in future refactoring
 */
export interface Report {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  description: string;
  image: string;
  image_urls: string[];
  video?: string;
  video_urls: string[];
  status?: string;
  is_public?: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Placeholder function to maintain compatibility with existing code
 * This will be removed in future refactoring
 */
export const getAllReports = async (): Promise<Report[]> => {
  console.log('getAllReports is deprecated - returning empty array');
  return [];
};

/**
 * Placeholder function to maintain compatibility with existing code
 * This will be removed in future refactoring
 */
export const getReportById = async (id: string): Promise<Report | null> => {
  console.log('getReportById is deprecated - returning null');
  return null;
}; 
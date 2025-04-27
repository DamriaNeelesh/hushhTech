// src/services/reportService.ts

// Supabase storage buckets (public)
export const STORAGE_BUCKETS = {
  IMAGES: 'https://spmxyqxjqxcyywkapong.supabase.co/storage/v1/object/public/alohafundsreport-images',
  VIDEOS: 'https://spmxyqxjqxcyywkapong.supabase.co/storage/v1/object/public/alohafundsreport-videos',
};

// Supabase REST API base URL & anon key
const API_BASE = 'https://spmxyqxjqxcyywkapong.supabase.co/rest/v1';
const API_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwbXh5cXhqcXhjeXl3a2Fwb25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTYwNDIsImV4cCI6MjA2MDI5MjA0Mn0._C6lZcTubk2VuwDKC2uDOsiFFPaKRiEJSqBjtGpm99E';

// Raw shape returned by Supabase
interface RawReport {
  id: string;
  title: string;
  subtitle?: string;
  date: string;           // e.g. "14/03/2025" or "2025-03-14"
  time?: string;
  description?: string;
  image_urls?: string[];  // e.g. ["1.png","2.jpg",…]
  video_urls?: string[];  // e.g. ["1.mp4",…]
  [k: string]: any;
}

// Enriched Report for your React code
export interface Report {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time?: string;
  description?: string;
  public_image_urls: string[];
  public_video_urls: string[];
  [k: string]: any;
}

/**
 * Convert "14/03/2025" (or ISO) into your bucket folder name "dmu14mar"
 */
function dateToFolder(name: string): string {
  // if incoming is dd/mm/yyyy
  const m = name.match(/^(\d{1,2})\/(\d{1,2})\/\d{4}$/);
  if (m) {
    const day = parseInt(m[1], 10);
    const monthNames = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    const mon = monthNames[ parseInt(m[2],10) - 1 ];
    return `dmu${day}${mon}`;
  }
  // otherwise assume it's already a folder string like "dmu14mar"
  return name;
}

/**
 * Fetch a single report by ID, then prepend full bucket URLs
 */
export const getReportById = async (id: string): Promise<Report | null> => {
  const res = await fetch(
    `${API_BASE}/reports?id=eq.${id}&select=*`,
    {
      headers: {
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    console.error('Failed to fetch report', res.status, res.statusText);
    return null;
  }
  const [raw]: RawReport[] = await res.json();
  if (!raw) return null;

  const folder = dateToFolder(raw.date);
  const imgs  = raw.image_urls  || [];
  const vids  = raw.video_urls  || [];

  return {
    ...raw,
    public_image_urls: imgs.map(fn => `${STORAGE_BUCKETS.IMAGES}/${folder}/${fn}`),
    public_video_urls: vids.map(fn => `${STORAGE_BUCKETS.VIDEOS}/${folder}/${fn}`),
  };
};

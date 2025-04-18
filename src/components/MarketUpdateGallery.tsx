import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Image, 
  SimpleGrid, 
  Text, 
  Spinner,
  Skeleton,
  SkeletonText 
} from '@chakra-ui/react';
import { STORAGE_BUCKETS } from '../services/reportService';

interface MarketUpdateGalleryProps {
  date: string; // Format: 'dmu14mar', 'dmu24mar', etc. or 'DD/M/YYYY' for API format
  showTestImage?: boolean; // Option to show/hide the test image
  title?: string; // Optional custom title
  imageCount?: number;
  apiDateFormat?: boolean; // Whether the date is in API format (DD/M/YYYY)
  userId?: string; // Optional user ID for API format images
  reportId?: string; // Optional report ID for API format images
}

/**
 * A reusable gallery component for displaying market update images from Supabase
 * @param date - The date folder in format 'dmu14mar', 'dmu24mar', etc. or 'DD/M/YYYY' for API format
 * @param showTestImage - Whether to show a test image at the top (default: false)
 * @param title - Custom title for the gallery section (default: "Supporting Charts & Data")
 * @param imageCount - Number of skeleton placeholders to show while loading (default: 6)
 * @param apiDateFormat - Whether the date is in API format (DD/M/YYYY) (default: false)
 * @param userId - User ID for API format images
 * @param reportId - Report ID for API format images
 */
const MarketUpdateGallery: React.FC<MarketUpdateGalleryProps> = ({
  date,
  showTestImage = false,
  title = "Supporting Charts & Data",
  imageCount = 6, // Default to showing 6 skeleton placeholders
  apiDateFormat = false,
  userId = 'system',
  reportId
}) => {
  const [images, setImages] = useState<{name: string, url: string}[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Define the base URL for Supabase storage
  const baseUrl = STORAGE_BUCKETS.IMAGES;

  // Get the folder path based on the date format
  const getFolderPath = (): string => {
    if (!date) return '';

    // If it's already in the dmu format, use it directly
    if (date.startsWith('dmu')) {
      return `market-updates/${date}`;
    }

    // If it's in the API format (DD/M/YYYY), convert it to dmu format
    if (apiDateFormat && date.match(/^\d{1,2}\/\d{1,2}\/\d{4}/)) {
      try {
        // Parse the date parts
        const parts = date.split('/');
        if (parts.length >= 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1; // Convert to 0-based
          
          // Month abbreviations
          const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
          const monthAbbr = monthNames[month];
          
          // If this is an API report, it should use the reports/{user_id} path from documentation
          if (apiDateFormat) {
            return `reports/${userId}`;
          }
          
          return `market-updates/dmu${day}${monthAbbr}`;
        }
      } catch (error) {
        console.error('Error parsing API date format:', error);
      }
    }

    // Fallback - use the date as-is and hope it works
    return `market-updates/${date}`;
  };
  
  // Get the folder path
  const folderPath = getFolderPath();
  
  // Common image extensions to try
  const extensions = ['.png', '.jpg', '.jpeg', '.gif'];
  
  // Common prefixes to try
  const prefixes = [
    '', // Just the number (1.png)
    'v', // v1.png (for videos)
    'chart', // chart1.png
    'data', // data1.png
    'img', // img1.png
    'image', // image1.png
  ];
  
  useEffect(() => {
    setIsLoading(true);
    
    // Generate a comprehensive set of possible image URLs to try
    const possibleImages = [];
    
    // Special case for API format - try to find images in the 'reports/{user_id}' format per documentation
    if (apiDateFormat) {
      // Generate possible timestamps to try (since we don't know the exact one)
      // In production code, these would ideally come from the API itself
      const timestamps = [
        // Try some generic names for reports
        '',
        'latest_',
        'chart_',
        'data_',
        'market_',
        'update_'
      ];
      
      // Use the report ID if available
      if (reportId) {
        timestamps.push(`${reportId}_`);
      }
      
      // Try different combinations of timestamps and filenames
      for (const timestamp of timestamps) {
        for (let i = 1; i <= 10; i++) {
          // Try standard image formats with timestamps
          for (const ext of extensions) {
            possibleImages.push({
              name: `${timestamp}${i}${ext}`,
              url: `${baseUrl}/reports/${userId}/${timestamp}${i}${ext}`
            });
            
            // Also try with prefixes
            for (const prefix of prefixes) {
              if (prefix) { // Skip empty prefix as it's covered above
                possibleImages.push({
                  name: `${timestamp}${prefix}${i}${ext}`,
                  url: `${baseUrl}/reports/${userId}/${timestamp}${prefix}${i}${ext}`
                });
              }
            }
          }
        }
      }
    } else {
      // Original behavior for non-API images
      // Try numbers 1-20 with different prefixes and extensions
      for (let i = 1; i <= 20; i++) {
        for (const prefix of prefixes) {
          for (const ext of extensions) {
            possibleImages.push({
              name: `${prefix}${i}${ext}`,
              url: `${baseUrl}/${folderPath}/${prefix}${i}${ext}`
            });
          }
        }
      }
    }
    
    // Set up image loading
    const loadedImages: {name: string, url: string}[] = [];
    const imagePromises: Promise<void>[] = [];
    
    // Try to load each possible image
    possibleImages.forEach(image => {
      const promise = new Promise<void>((resolve) => {
        const img = document.createElement('img');
        img.onload = () => {
          loadedImages.push(image);
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
        img.src = image.url;
      });
      
      imagePromises.push(promise);
    });
    
    // When all images have been tried, update state with the ones that loaded
    Promise.all(imagePromises).then(() => {
      setImages(loadedImages);
      setIsLoading(false);
    });
  }, [date, baseUrl, folderPath, apiDateFormat, userId, reportId]);

  const handleImageLoad = (imageName: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageName]: true
    }));
  };

  // Generate skeleton placeholders
  const renderSkeletons = () => {
    return Array(imageCount).fill(0).map((_, index) => (
      <Box 
        key={`skeleton-${index}`} 
        borderRadius="lg" 
        overflow="hidden"
        boxShadow="md"
        bg="white"
        p={2}
      >
        <Skeleton
          height="300px"
          fadeDuration={1}
          borderRadius="md"
          startColor="gray.100"
          endColor="gray.300"
          speed={1.2}
        />
      </Box>
    ));
  };

  return (
    <Box mt={8}>
      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        {title}
      </Heading>
      
      {/* Gallery of images */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {isLoading ? (
          // Show skeletons while loading
          renderSkeletons()
        ) : images.length > 0 ? (
          // Show actual images once loaded
          images.map((image) => (
            <Box 
              key={image.name} 
              borderRadius="lg" 
              overflow="hidden"
              boxShadow="md"
              bg="white"
              p={2}
              position="relative"
            >
              {/* Skeleton loader */}
              <Skeleton
                isLoaded={imagesLoaded[image.name]}
                fadeDuration={1}
                borderRadius="md"
                startColor="gray.100"
                endColor="gray.300"
                speed={1.2}
              >
                <Image
                  src={image.url}
                  alt={`Market Analysis ${image.name}`}
                  borderRadius="md"
                  objectFit="contain"
                  w="100%"
                  minH="300px"
                  maxH="400px"
                  loading="lazy"
                  bg="gray.50"
                  onLoad={() => handleImageLoad(image.name)}
                  onError={(e) => {
                    const parent = e.currentTarget.parentElement?.parentElement;
                    if (parent) {
                      parent.style.display = 'none';
                    }
                  }}
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.2s ease-in-out'
                    }
                  }}
                />
              </Skeleton>

              {/* Optional loading spinner overlay */}
              {!imagesLoaded[image.name] && (
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  zIndex="1"
                >
                  <Spinner 
                    size="md"
                    color="blue.500"
                    thickness="3px"
                    speed="0.8s"
                  />
                </Box>
              )}
            </Box>
          ))
        ) : (
          // Show a message if no images were found
          <Box textAlign="center" gridColumn="1 / -1" py={8}>
            <Text color="gray.500">No images available for this update.</Text>
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default MarketUpdateGallery;
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

interface MarketUpdateGalleryProps {
  date: string; // Format: 'dmu14mar', 'dmu24mar', etc.
  showTestImage?: boolean; // Option to show/hide the test image
  title?: string; // Optional custom title
  imageCount?: number;
}

/**
 * A reusable gallery component for displaying market update images from Supabase
 * @param date - The date folder in format 'dmu14mar', 'dmu24mar', etc.
 * @param showTestImage - Whether to show a test image at the top (default: false)
 * @param title - Custom title for the gallery section (default: "Supporting Charts & Data")
 */
const MarketUpdateGallery: React.FC<MarketUpdateGalleryProps> = ({
  date,
  showTestImage = false,
  title = "Supporting Charts & Data",
  imageCount = 6 // Default to showing 6 skeleton placeholders
}) => {
  const [images, setImages] = useState<{name: string, url: string}[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Define the base URL for Supabase storage
  const baseUrl = 'https://gsqmwxqgqrgzhlhmbscg.supabase.co/storage/v1/object/public/website';
  const folderPath = `market-updates/${date}`;
  
  // Common image extensions to try
  const extensions = ['.png', '.jpg'];
  
  // Common prefixes to try
  const prefixes = [
    '', // Just the number (1.png)
    'v', // v1.png (for videos)
  ];
  
  useEffect(() => {
    setIsLoading(true);
    
    // Generate a comprehensive set of possible image URLs to try
    const possibleImages = [];
    
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
  }, [date, baseUrl, folderPath]);

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
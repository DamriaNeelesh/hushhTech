import React, { useState, useEffect } from 'react';
import { Box, Heading, Image, SimpleGrid, Text, Spinner } from '@chakra-ui/react';

interface MarketUpdateGalleryProps {
  date: string; // Format: 'dmu14mar', 'dmu24mar', etc.
  showTestImage?: boolean; // Option to show/hide the test image
  title?: string; // Optional custom title
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
  title = "Supporting Charts & Data"
}) => {
  const [images, setImages] = useState<{name: string, url: string}[]>([]);
  
  // Define the base URL for Supabase storage
  const baseUrl = 'https://gsqmwxqgqrgzhlhmbscg.supabase.co/storage/v1/object/public/website';
  const folderPath = `market-updates/${date}`;
  
  // Common image extensions to try
  const extensions = ['.png', '.jpg', '.jpeg'];
  
  // Common prefixes to try
  const prefixes = [
    '', // Just the number (1.png)
    'v', // v1.png (for videos)
  ];
  
  useEffect(() => {
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
        const img = document.createElement('img'); // Use DOM API instead of constructor
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
    });
  }, [date, baseUrl, folderPath]);

  return (
    <Box mt={8}>
      <Heading as="h3" fontSize="lg" color="black" mb={4}>
        {title}
      </Heading>
      
      {/* No images state */}
      {images.length === 0 && (
        <Text textAlign="center" mt={4} color="gray.500">
          Loading images...
        </Text>
      )}
      
      {/* Optional test image */}
      {showTestImage && images.length > 0 && (
        <Box mb={4}>
          <Heading as="h4" fontSize="md" mb={2}>Test Image:</Heading>
          <Image 
            src={images[0].url}
            alt="Test Market Update Image" 
            borderRadius="md"
            maxH="300px"
          />
        </Box>
      )}
      
      {/* Gallery of images */}
      {images.length > 0 && (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {images.map((image) => (
            <Box 
              key={image.name} 
              borderRadius="md" 
              overflow="hidden"
            >
              <Image
                src={image.url}
                alt={`Market Analysis ${image.name}`}
                borderRadius="md"
                objectFit="cover"
                w="100%"
                h="300px"
                loading="lazy"
                fallback={
                  <Box w="100%" h="300px" bg="gray.200" display="flex" alignItems="center" justifyContent="center">
                    Loading Image...
                  </Box>
                }
              />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default MarketUpdateGallery;
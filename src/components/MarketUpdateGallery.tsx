import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Image, 
  SimpleGrid, 
  Text, 
  Spinner,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Flex
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface MarketUpdateGalleryProps {
  date: string; // Format: 'dmu14mar' or 'DD/MM/YYYY'
  showTestImage?: boolean;
  title?: string;
  imageCount?: number;
  apiDateFormat?: boolean; // Flag to indicate if date is in DD/MM/YYYY format
}

const MarketUpdateGallery: React.FC<MarketUpdateGalleryProps> = ({
  date,
  showTestImage = false,
  title = "Supporting Charts & Data",
  imageCount = 6,
  apiDateFormat = false
}) => {
  const [images, setImages] = useState<{name: string, url: string}[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Define the base URL for Supabase storage
  const baseUrl = 'https://gsqmwxqgqrgzhlhmbscg.supabase.co/storage/v1/object/public/website';
  
  // Format the folder path based on date format
  const formatFolderPath = (dateStr: string, isApiFormat: boolean): string => {
    if (isApiFormat && dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
      // For DD/MM/YYYY format
      return `market-updates/${dateStr}`;
    } else {
      // For 'dmuXXmon' format
      return `market-updates/${dateStr}`;
    }
  };
  
  const folderPath = formatFolderPath(date, apiDateFormat);
  
  // Common image extensions to try
  const extensions = ['.png', '.jpg', '.jpeg'];
  
  useEffect(() => {
    setIsLoading(true);
    
    // Generate a comprehensive set of possible image URLs to try
    const possibleImages = [];
    
    // Try numbers 1-20 with different extensions
    for (let i = 1; i <= 20; i++) {
      for (const ext of extensions) {
        possibleImages.push({
          name: `${i}${ext}`,
          url: `${baseUrl}/${folderPath}/${i}${ext}`
        });
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
      // Sort images numerically by name (1.png, 2.png, etc.)
      const sortedImages = loadedImages.sort((a, b) => {
        const numA = parseInt(a.name.match(/^\d+/)?.[0] || '0', 10);
        const numB = parseInt(b.name.match(/^\d+/)?.[0] || '0', 10);
        return numA - numB;
      });
      
      setImages(sortedImages);
      setIsLoading(false);
    });
  }, [date, baseUrl, folderPath, apiDateFormat]);

  const handleImageLoad = (imageName: string) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageName]: true
    }));
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpen();
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
              cursor="pointer"
              onClick={() => handleImageClick(image.url)}
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.02)' }}
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
                  alt={`Market Analysis Chart ${image.name.match(/^\d+/)?.[0] || ''}`}
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

      {/* Full-screen image modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent bg="transparent" maxW="100vw" maxH="100vh" m={0} p={0}>
          <ModalBody p={0} display="flex" alignItems="center" justifyContent="center">
            <Flex 
              position="absolute" 
              top={4} 
              right={4} 
              zIndex={2}
            >
              <IconButton
                aria-label="Close modal"
                icon={<CloseIcon />}
                onClick={onClose}
                colorScheme="whiteAlpha"
                variant="ghost"
                size="lg"
              />
            </Flex>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Full-screen market analysis chart"
                maxH="95vh"
                maxW="95vw"
                objectFit="contain"
                onClick={onClose}
                cursor="pointer"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MarketUpdateGallery;
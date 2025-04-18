import React from 'react';
import { Box, Heading, Text, Image, SimpleGrid, Spinner, AspectRatio } from '@chakra-ui/react';
import { Report, STORAGE_BUCKETS } from '../services/reportService';
import { formatLongDate, parseDate } from '../utils/dateFormatter';
import MarketUpdateGallery from './MarketUpdateGallery';

interface ReportDetailProps {
  report: Report | null;
  isLoading: boolean;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report, isLoading }) => {
  if (isLoading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!report) {
    return (
      <Box textAlign="center" py={8}>
        <Text>Report not found</Text>
      </Box>
    );
  }

  // Format the description by preserving line breaks
  const formatDescription = (description: string): React.ReactNode => {
    if (!description) return 'No description available';
    
    return description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < description.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Ensure image_urls is an array
  const imageUrls = Array.isArray(report.image_urls) ? report.image_urls : [];
  
  // Ensure video_urls is an array
  let videoUrls: string[] = [];
  try {
    if (Array.isArray(report.video_urls)) {
      videoUrls = report.video_urls;
    } else if (report.video && typeof report.video === 'string') {
      // Try to parse the legacy video JSON field
      const parsedVideo = JSON.parse(report.video);
      if (Array.isArray(parsedVideo)) {
        videoUrls = parsedVideo;
      }
    }
  } catch (error) {
    console.error('Error parsing video URLs:', error);
  }

  // Check if this is a daily market update by looking at the format of the date
  const isMarketUpdate = report.date && report.date.match(/^\d{1,2}\/\d{1,2}\/\d{4}/);
  
  // Extract the date part from the combined date field if needed
  const getDatePart = (dateString: string): string => {
    if (!dateString) return '';
    return dateString.split(' ')[0]; // Extract just the date part
  };
  
  // Convert the date to the DMU format
  const getMarketUpdateFolder = (): string => {
    if (!report.date) return 'dmu14mar'; // default fallback
    
    try {
      const datePart = getDatePart(report.date);
      const parsedDate = parseDate(datePart);
      
      if (!parsedDate || isNaN(parsedDate.getTime())) {
        return 'dmu14mar'; // default fallback
      }
      
      const day = parsedDate.getDate();
      const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
      const month = monthNames[parsedDate.getMonth()];
      
      return `dmu${day}${month}`;
    } catch (error) {
      console.error('Error converting date to DMU format:', error);
      return 'dmu14mar'; // default fallback
    }
  };
  
  // Get the market update folder name
  const marketUpdateFolder = getMarketUpdateFolder();
  
  // Get date string for display
  const dateForDisplay = formatLongDate(report.date);

  return (
    <Box>
      <Box mb={6}>
        <Heading as="h1" size="xl" mb={2}>
          {report.title || 'Untitled Report'}
        </Heading>
        {report.subtitle && (
          <Heading as="h2" size="md" fontWeight="normal" mb={2}>
            {report.subtitle}
          </Heading>
        )}
        <Text fontSize="sm" color="gray.600" mb={4}>
          {dateForDisplay} {report.time && `at ${report.time}`}
        </Text>
        <Text fontSize="md" mb={8} whiteSpace="pre-line">
          {formatDescription(report.description)}
        </Text>
      </Box>

      {/* Images Section */}
      <Box mb={8}>
        {/* Use MarketUpdateGallery component with the correct date folder */}
        <MarketUpdateGallery 
          date={marketUpdateFolder}
          title="Supporting Charts & Data"
          imageCount={6}
        />
      </Box>

      {/* Videos Section - Mobile Optimized */}
      {videoUrls.length > 0 && (
        <Box mb={10}>
          <Heading 
            as="h3" 
            size="md" 
            mb={{ base: 4, md: 5 }} 
            color="gray.800"
            textAlign={{ base: "center", md: "left" }}
          >
            Related Videos
          </Heading>
          
          <SimpleGrid 
            columns={{ base: 1, lg: videoUrls.length > 1 ? 2 : 1 }} 
            spacing={{ base: 5, md: 8 }}
            mx={{ base: "-10px", md: 0 }}
          >
            {videoUrls.map((videoUrl, index) => {
              // Process video URL to ensure proper embedding and fullscreen support
              let processedUrl = videoUrl;
              
              // Add parameters for better mobile experience if it's YouTube
              if (videoUrl.includes('youtube.com/embed') || videoUrl.includes('youtube.com/watch')) {
                // If it's a watch URL, convert to embed format
                if (videoUrl.includes('watch?v=')) {
                  const videoId = new URL(videoUrl).searchParams.get('v');
                  processedUrl = `https://www.youtube.com/embed/${videoId}`;
                }
                
                // Add parameters for better playback
                const separator = processedUrl.includes('?') ? '&' : '?';
                processedUrl = `${processedUrl}${separator}rel=0&showinfo=0&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;
              }
              
              return (
                <Box
                  key={`video-${index}`}
                  borderRadius={{ base: "lg", md: "xl" }}
                  overflow="hidden"
                  boxShadow={{ base: "md", md: "lg" }}
                  bg="white"
                  width={{ base: "calc(100% - 8px)", md: "100%" }}
                  maxWidth="100%"
                  transition="all 0.2s ease"
                  _hover={{
                    transform: { base: "none", md: "translateY(-4px)" },
                    boxShadow: { base: "md", md: "xl" },
                  }}
                  position="relative"
                >
                  {/* Video wrapper with improved responsive behavior */}
                  <Box 
                    position="relative"
                    width="100%"
                    height={{ base: "0", md: "auto" }}
                    paddingBottom={{ base: "56.25%", md: "0" }} // 16:9 aspect ratio for mobile
                    minHeight={{ base:'700px',md:"700px", lg: "700px", xl: "700px" }} // Taller on desktop
                    overflow="hidden"
                    borderRadius="md"
                    background="black"
                  >
                    <iframe
                      title={`${report.title || 'Report'} video ${index + 1}`}
                      src={processedUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      loading="lazy"
                      frameBorder="0"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-presentation allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "0.375rem"
                      }}
                      onError={(e) => {
                        // Add fallback for video load errors
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const errorElement = document.createElement('div');
                          errorElement.textContent = 'Video failed to load';
                          errorElement.style.position = 'absolute';
                          errorElement.style.top = '0';
                          errorElement.style.left = '0';
                          errorElement.style.width = '100%';
                          errorElement.style.height = '100%';
                          errorElement.style.display = 'flex';
                          errorElement.style.alignItems = 'center';
                          errorElement.style.justifyContent = 'center';
                          errorElement.style.color = 'white';
                          errorElement.style.background = 'rgba(0,0,0,0.7)';
                          errorElement.style.fontSize = '14px';
                          parent.appendChild(errorElement);
                          
                          // Add retry button
                          const retryBtn = document.createElement('button');
                          retryBtn.textContent = 'Retry';
                          retryBtn.style.marginLeft = '8px';
                          retryBtn.style.padding = '4px 8px';
                          retryBtn.style.backgroundColor = '#e53e3e';
                          retryBtn.style.color = 'white';
                          retryBtn.style.border = 'none';
                          retryBtn.style.borderRadius = '4px';
                          retryBtn.style.cursor = 'pointer';
                          retryBtn.onclick = () => {
                            target.style.display = 'block';
                            errorElement.remove();
                            target.src = processedUrl;
                          };
                          errorElement.appendChild(retryBtn);
                        }
                      }}
                    />
                    
                    {/* Fullscreen button for both mobile and desktop */}
                    <Box
                      position="absolute"
                      bottom="8px"
                      right="8px"
                      zIndex="1"
                      onClick={() => {
                        // Try to trigger fullscreen on the iframe
                        try {
                          const iframe = document.querySelector(`iframe[title="${report.title || 'Report'} video ${index + 1}"]`) as HTMLIFrameElement;
                          if (iframe) {
                            // Try various fullscreen methods
                            if (iframe.requestFullscreen) {
                              iframe.requestFullscreen();
                            } else if ((iframe as any).webkitRequestFullscreen) {
                              (iframe as any).webkitRequestFullscreen();
                            } else if ((iframe as any).mozRequestFullScreen) {
                              (iframe as any).mozRequestFullScreen();
                            } else if ((iframe as any).msRequestFullscreen) {
                              (iframe as any).msRequestFullscreen();
                            } else {
                              // If iframe fullscreen fails, try the container element
                              const container = iframe.parentElement;
                              if (container && container.requestFullscreen) {
                                container.requestFullscreen();
                              } else if (container && (container as any).webkitRequestFullscreen) {
                                (container as any).webkitRequestFullscreen();
                              }
                            }
                          }
                        } catch (e) {
                          console.error("Fullscreen failed", e);
                          // Try opening in new tab as fallback
                          window.open(processedUrl, '_blank');
                        }
                      }}
                      bg="rgba(0,0,0,0.5)"
                      p={{ base: "6px", md: "8px" }}
                      borderRadius="md"
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{ bg: "rgba(0,0,0,0.7)", transform: "scale(1.1)" }}
                      title="Fullscreen"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 14H5V19H10V17H7V14Z" fill="white"/>
                        <path d="M5 10H7V7H10V5H5V10Z" fill="white"/>
                        <path d="M17 17H14V19H19V14H17V17Z" fill="white"/>
                        <path d="M14 5V7H17V10H19V5H14Z" fill="white"/>
                      </svg>
                    </Box>
                    
                    {/* Desktop play button overlay to improve UX */}
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      width="100%"
                      height="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      pointerEvents="none"
                      opacity="0"
                      transition="opacity 0.3s"
                      _hover={{ opacity: 1 }}
                      bg="rgba(0,0,0,0.2)"
                    >
                      <Box
                        width="60px"
                        height="60px"
                        borderRadius="full"
                        bg="rgba(0,0,0,0.6)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        pointerEvents="auto"
                        cursor="pointer"
                        _hover={{ bg: "rgba(0,0,0,0.8)", transform: "scale(1.1)" }}
                        onClick={() => {
                          // This helps engage with the iframe on desktop to enable controls
                          const iframe = document.querySelector(`iframe[title="${report.title || 'Report'} video ${index + 1}"]`) as HTMLIFrameElement;
                          if (iframe) {
                            iframe.focus();
                            // Try to send a click event to the iframe
                            try {
                              const iframeWindow = iframe.contentWindow;
                              if (iframeWindow) {
                                iframeWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                              }
                            } catch (e) {
                              console.error("Could not interact with iframe", e);
                            }
                          }
                        }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5V19L19 12L8 5Z" fill="white" />
                        </svg>
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Video title with better spacing */}
                  {report.title && (
                    <Text 
                      fontSize={{ base: "xs", md: "sm" }}
                      mt={{ base: 3, md: 3 }}
                      mb={{ base: 1, md: 0 }}
                      px={{ base: 1, md: 0 }}
                      fontWeight="medium" 
                      color="gray.600"
                      textAlign="center"
                      noOfLines={2}
                    >
                      {report.title}{videoUrls.length > 1 ? ` - Video ${index + 1}` : ''}
                    </Text>
                  )}
                </Box>
              );
            })}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default ReportDetail; 
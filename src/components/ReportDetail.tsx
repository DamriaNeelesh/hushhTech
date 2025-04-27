// src/components/ReportDetail.tsx
import React from 'react'
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Spinner,
  AspectRatio,
} from '@chakra-ui/react'
import { Report } from '../services/reportService'
// import { formatLongDate } from '../utils/dateFormatter'

interface ReportDetailProps {
  report: Report | null
  isLoading: boolean
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report, isLoading }) => {
  if (isLoading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="xl" />
      </Box>
    )
  }

  if (!report) {
    return (
      <Box textAlign="center" py={8}>
        <Text>No report to display.</Text>
      </Box>
    )
  }

  return (
    <Box>
      <Heading as="h1" size="xl" mb={2}>
        {report.title}
      </Heading>
      {report.subtitle && (
        <Heading as="h2" size="md" fontWeight="normal" mb={4}>
          {report.subtitle}
        </Heading>
      )}
      <Text fontSize="sm" color="gray.600" mb={6}>
        report.date
        {report.time && ` at ${report.time}`}
      </Text>

      {report.description && (
        <Text whiteSpace="pre-line" mb={8}>
          {report.description}
        </Text>
      )}

      {report.public_image_urls.length > 0 && (
        <Box mb={8}>
          <Heading as="h3" size="md" mb={4}>
            Charts & Data
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
            {report.image_urls.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Chart ${i + 1}`}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: 'md'
                }}
              />
            ))}
          </SimpleGrid>
        </Box>
      )}

      {report.public_video_urls.length > 0 && (
        <Box mb={8}>
          <Heading as="h3" size="md" mb={4}>
            Related Videos
          </Heading>
          <SimpleGrid columns={{ base: 1, md: report.public_video_urls.length > 1 ? 2 : 1 }} spacing={4}>
            {report.public_video_urls.map((src, i) => (
              <AspectRatio key={i} ratio={16 / 9} borderRadius="md" overflow="hidden">
                <video src={src} controls style={{ width: '100%', height: '100%' }} />
              </AspectRatio>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  )
}

export default ReportDetail

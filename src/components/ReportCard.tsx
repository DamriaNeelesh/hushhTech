import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Report } from '../services/reportService';
import { formatShortDate } from '../utils/dateFormatter';

interface ReportCardProps {
  report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <Box
      key={report.id}
      mb={6}
      _hover={{
        "& > p:last-of-type": {
          textDecoration: "underline"
        }
      }}
    >
      {/* Date in red, bold */}
      <Text
        color="red.600"
        fontWeight="bold"
        fontSize={{ base: "sm", md: "md" }}
        mb={1}
      >
        {formatShortDate(report.date)}
      </Text>
      
      {/* Title as a link */}
      <Link to={`/reports/${report.id}`}>
        <Text
          color="gray.900"
          fontSize={{ base: "md", md: "lg" }}
          _hover={{ textDecoration: "underline" }}
        >
          {report.title || 'Untitled Report'}
        </Text>
      </Link>
    </Box>
  );
};

export default ReportCard; 
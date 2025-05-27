import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Text,
  Spinner,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import ReportDetail from '../../components/ReportDetail';
import { getReportById, Report } from '../../services/reportService';

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) {
        setError('Report ID is missing');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching report with ID:', id);
        const reportData = await getReportById(id);
        
        if (reportData) {
          console.log('Fetched report:', reportData);
          setReport(reportData);
        } else {
          setError('The requested report could not be found');
          console.error('Report not found:', id);
        }
      } catch (error) {
        console.error('Error fetching report:', error);
        setError('Failed to load the report. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  // Render content based on state
  const renderContent = () => {
    if (loading) {
      return (
        <Box textAlign="center" py={8}>
          <Spinner size="xl" />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert 
          status="error" 
          variant="subtle" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          textAlign="center" 
          borderRadius="md"
          py={6}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Error Loading Report
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {error}
          </AlertDescription>
        </Alert>
      );
    }

    if (!report) {
      return (
        <Alert 
          status="info" 
          variant="subtle" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          textAlign="center" 
          borderRadius="md"
          py={6}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Report Not Found
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            We couldn't find the report you're looking for.
          </AlertDescription>
        </Alert>
      );
    }

    return <ReportDetail report={report} isLoading={false} />;
  };

  return (
    <Box bg="white" minH="100vh" py={12} px={4}>
      <Container maxW="container.md">
        <Text as={'h2'} fontSize={{base:'sm',md:'md'}} fontWeight={'600'} color={'#0AADBC'}>
          Market Updates
        </Text>
        
        {renderContent()}
        
        {/* <Text fontSize={'sm'} my={{md:'3rem',base:'1.5rem'}}>
          © 2025 Hushh Technologies LLC. All Rights Reserved. The materials on this website are for illustration and discussion purposes only and do not constitute an offering. An offering may be made only by delivery of a confidential offering memorandum to appropriate investors. PAST PERFORMANCE IS NO GUARANTEE OF FUTURE RESULTS. 
        </Text> */}
      </Container>
    </Box>
  );
};

export default ReportDetailPage; 
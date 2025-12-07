import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

const AIPoweredBerkshire = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Open the Gamma site in a new tab
    window.open('https://hushh-fund-a-wtv9ctn.gamma.site/', '_blank');
    // Redirect back to community
    navigate('/community');
  }, [navigate]);
  
  return (
    <>
      <Helmet>
        <title>The AI-Powered Berkshire Hathaway | Hushh Fund A</title>
        <meta name="description" content="Hushh Technologies Fund A Strategy – Investing in the Future of Free Cash Flow" />
      </Helmet>
      <div>Redirecting...</div>
    </>
  );
};

export default AIPoweredBerkshire;

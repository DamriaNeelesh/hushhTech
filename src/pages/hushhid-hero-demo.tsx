import React from 'react';
import { useNavigate } from 'react-router-dom';
import HushhIDHero from '../components/HushhIDHero';

/**
 * Demo page to showcase the Apple-style Hushh ID Hero component
 * This demonstrates the premium, polished design inspired by Apple's service tiles
 */
const HushhIDHeroDemo: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    console.log('Create Hushh ID clicked');
    // Navigate to investor profile creation or show form
    navigate('/investor-profile');
  };

  return (
    <div>
      <HushhIDHero 
        userName="Ankit Kumar Singh" 
        onCreateClick={handleCreateClick} 
      />
    </div>
  );
};

export default HushhIDHeroDemo;

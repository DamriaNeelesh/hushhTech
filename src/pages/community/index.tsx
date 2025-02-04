import React from 'react'
import CommunitySection from './communityUpdates';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

const community = () => {
  return (
    <Routes>
      <Route path="/community" element={<CommunitySection />} />
    </Routes>
  )
}

export default community
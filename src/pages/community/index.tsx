import React from 'react'
import MarketUpdates from './marketUpdates'
import { Link, Routes, Route, useLocation } from 'react-router-dom';

const community = () => {
  return (
    <Routes>
      <Route path="/community" element={<MarketUpdates />} />
    </Routes>
  )
}

export default community
import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { careers } from '../../data/career';
import JobDetails from './JobDetails';
import './Career.css';

const CareerList = () => {
  return (
    <div className="career-container">
      <div className="career-content">
        <h1 className="career-title">Jobs</h1>
        
        {Object.entries(careers).map(([department, jobs]) => (
          <div key={department} className="department-section">
            <h2 className="department-title">{department}</h2>
            {jobs.map((job) => (
              <div key={job.id} className="job-listing">
                <Link to={`/career/${job.id}`} className="job-title">
                  {job.title}
                </Link>
                <p className="job-location">{job.location}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      
    </div>
  );
};

const Career = () => {
  const location = useLocation();
  
  // Only show the career list on the main career page
  if (location.pathname === '/career') {
    return <CareerList />;
  }

  return (
    <Routes>
      <Route path="/:jobId" element={<JobDetails />} />
    </Routes>
  );
};

export default Career;
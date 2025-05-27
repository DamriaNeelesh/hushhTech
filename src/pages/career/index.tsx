import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { careers } from '../../data/career';
import JobDetails from './JobDetails';
import './Career.css';

const CareerList = () => {
  return (
    <div className="career-container" >
      <div className="career-content">
        <h1 className="career-title text-[#0AADBC]">Hushh Jobs</h1>
        
        {Object.entries(careers).map(([department, jobs]) => (
          <div key={department} className="department-section">
            <h2 className="text-black font-bold text-2xl">{department}</h2>
            {jobs.map((job) => (
              <div onClick={() => window.location.href = `/career/${job.id}`} key={job.id} className="job-listing">
                <Link to={`/career/${job.id}`} className=" text-black font-[500] text-xl">
                  {job.title}
                </Link>
                <p className="text-black-300"><Link to={`/career/${job.id}`} className="text-black font-[200] text-md">{job.location}</Link></p>
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
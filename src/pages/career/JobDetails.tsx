import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { careers } from '../../data/career';
import ApplicationForm from './ApplicationForm';

const JobDetails = () => {
  const { jobId } = useParams();
  const [showForm, setShowForm] = useState(false);

  const job = Object.values(careers)
    .flat()
    .find(j => j.id === jobId);

  if (!job) return <div>Position not found</div>;

  return (
    <div className="job-details-container">
      <div className="job-details-content">
        <h1 className="job-details-title">{job.title}</h1>
        <p className="job-details-location">{job.location}</p>
        
        {job.salary && (
          <div className="salary-range">
            <h3>Salary Range</h3>
            <p>{job.salary}</p>
          </div>
        )}

        <div className="responsibilities-section">
          <h3>Responsibilities</h3>
          <ul>
            {job.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>

        <div className="qualifications-section">
          <h3>Skills, Qualifications, and Experience</h3>
          <ul>
            {job.qualifications.map((qual, index) => (
              <li key={index}>{qual}</li>
            ))}
          </ul>
        </div>

        <button 
          className="apply-button"
          onClick={() => setShowForm(true)}
        >
          Apply Now
        </button>

        {showForm && (
          <ApplicationForm 
            jobTitle={job.title}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default JobDetails;
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { careers } from "../../data/career";
import ApplicationForm from "./ApplicationForm";

const JobDetails = () => {
  const { jobId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };
  const job = Object.values(careers)
    .flat()
    .find((j) => j.id === jobId);

  if (!job) return <div>Position not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back to Careers button */}
      <div className="mb-6">
        <button 
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          onClick={() => window.history.back()}
        >
          <span className="mr-1">←</span> Back to Careers
        </button>
      </div>

      {/* Job Details Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 mb-4">
          {job.location && (
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>{job.location}</span>
            </div>
          )}
          
          {job.salary && (
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{job.salary}</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-600">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Full-time</span>
          </div>
        </div>

        <div className="mt-6">
          <button 
            className="bg-sky-400 hover:bg-sky-500 text-white font-medium py-2 px-6 rounded-md transition-colors"
            onClick={() => setShowForm(true)}
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About HushhTech</h2>
        <p className="text-gray-700 leading-relaxed">
          Hushh Technologies LLC is a cutting-edge investment technology firm that leverages artificial intelligence and 
          advanced mathematical models to generate superior risk-adjusted returns. We combine the precision of quantitative 
          analysis with the power of machine learning to identify and capitalize on market opportunities that traditional 
          investment approaches miss.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Our team consists of world-class researchers, engineers, and investment professionals who are passionate about 
          pushing the boundaries of what's possible in finance. We offer a collaborative environment where innovation thrives 
          and exceptional talent is recognized and rewarded.
        </p>
      </div>

      {/* Responsibilities Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Responsibilities</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          {job.responsibilities.map((resp, index) => (
            <li key={index} className="leading-relaxed">{resp}</li>
          ))}
        </ul>
      </div>

      {/* Qualifications Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Skills, Qualifications, and Experience</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          {job.qualifications.map((qual, index) => (
            <li key={index} className="leading-relaxed">{qual}</li>
          ))}
        </ul>
      </div>

      {/* Leadership Principles Section */}
      {job.leadershipPrinciples && job.leadershipPrinciples.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Leadership Principles</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {job.leadershipPrinciples.map((principle, index) => (
              <li key={index} className="leading-relaxed">{principle}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Hiring Procedure Section */}
      {job?.hiringProcedure && job?.hiringProcedure.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hiring Procedure</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {job.hiringProcedure.map((procedure, index) => (
              <li key={index} className="leading-relaxed">{procedure}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Compensation Procedure Section */}
      {job?.compensationProcedure && job?.compensationProcedure.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Compensation Procedure</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            {job.compensationProcedure.map((procedure, index) => (
              <li key={index} className="leading-relaxed">{procedure}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Salary Details Section */}
      {job?.salaryDetails && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Salary Details</h2>
          <ul className="text-gray-700 space-y-4">
            {Object.entries(job.salaryDetails).map(([role, details], index) => (
              <li key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <strong className="text-gray-900">{toTitleCase(role.replace(/([A-Z])/g, ' $1').trim())}:</strong>
                <ul className="mt-2 space-y-1">
                  {details.averageSalary && <li>Average Salary: {details.averageSalary}</li>}
                  {details.range && <li>Range: {details.range}</li>}
                  {details.competitiveSalaryRange && (
                    <li>
                      Competitive Salary Range:
                      <ul className="ml-4 mt-1 space-y-1">
                        {Object.entries(details.competitiveSalaryRange).map(([level, range], idx) => (
                          <li key={idx}>{level.charAt(0).toUpperCase() + level.slice(1)}: {range}</li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showForm && (
        <ApplicationForm
          jobTitle={job.title}
          jobLocation={job.location}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default JobDetails;

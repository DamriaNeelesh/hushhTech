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
    <div className="job-details-container">
      <div className="job-details-content">
        <h1 className="job-details-title">{job.title}</h1>
        <p className="job-details-location">{job.location}</p>

        {job.salary && (
          <div className="salary-range flex flex-row">
            <h3>Salary Range :</h3>
            <p>{job.salary ? job.salary : "Not Disclosed"}</p>
          </div>
        )}

{job?.salaryDetails && (
          <div className="salary-details-section">
            <ul className="salary-range flex flex-col gap-2" >
              {Object.entries(job.salaryDetails).map(([role, details], index) => (
                <li key={index} className="">
                  <strong>{toTitleCase(role.replace(/([A-Z])/g, ' $1').trim())}:</strong>
                  <ul className="ml-4">
                    {details.averageSalary && <li>Average Salary: {details.averageSalary}</li>}
                    {details.range && <li>Range: {details.range}</li>}
                    {details.competitiveSalaryRange && (
                      <li>
                        Competitive Salary Range:
                        <ul>
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

        <div className="responsibilities-section">
          <h3>About HushhTech</h3>
          <ul>
              <li>hushhTech (Hushh Technologies) is a cutting-edge investment technology startup on a mission to leverage advanced math, AI, and statistics to generate sustainable alpha in dynamic markets . Founded by industry veterans – including a former Google product director and a former Salesforce lead data scientist – we combine deep expertise in artificial intelligence and finance to drive innovative wealth creation. Our team is lean, globally distributed, and fiercely passionate about redefining the future of finance through technology. If you thrive in a fast-paced environment with a bold vision, hushhTech offers the culture of a nimble startup with the impact of a global venture.</li>
          </ul>
        </div>
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

        {/* Render Leadership Principles if available */}
        {job.leadershipPrinciples && job.leadershipPrinciples.length > 0 && (
          <div className="qualifications-section">
            <h3 className="section-title">Leadership Principles</h3>
            <ul className="list-disc pl-5">
              {job.leadershipPrinciples.map((principle, index) => (
                <li key={index}>{principle}</li>
              ))}
            </ul>
          </div>
        )}
        {job?.hiringProcedure && job?.hiringProcedure.length > 0 && (
          <div className="qualifications-section">
            <h3 className="section-title">Hiring Procedure</h3>
            <ul className="list-disc pl-5">
              {job?.hiringProcedure.map((principle, index) => (
                <li key={index}>{principle}</li>
              ))}
            </ul>
          </div>
        )}

        {job?.compensationProcedure &&
          job?.compensationProcedure.length > 0 && (
            <div className="qualifications-section">
              <h3 className="section-title">Compensation Procedure</h3>
              <ul className="list-disc pl-5">
                {job?.compensationProcedure.map((principle, index) => (
                  <li key={index}>{principle}</li>
                ))}
              </ul>
            </div>
          )}

        <button className="apply-button" onClick={() => setShowForm(true)}>
          Apply Now
        </button>

        {showForm && (
          <ApplicationForm
            jobTitle={job.title}
            jobLocation={job.location}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default JobDetails;

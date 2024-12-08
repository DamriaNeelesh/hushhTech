import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface ApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
}

const ApplicationForm = ({ jobTitle, onClose }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resumeLink: '',
    coverLetterLink: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate URLs
      if (!isValidUrl(formData.resumeLink)) {
        throw new Error('Please enter a valid resume link');
      }

      if (formData.coverLetterLink && !isValidUrl(formData.coverLetterLink)) {
        throw new Error('Please enter a valid cover letter link');
      }

      // Send email with links
      await emailjs.send(
        'service_tsuapx9', 
        'template_fx7ipta',
        {
          to_name: 'Hiring Manager',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          position: jobTitle,
          resume_link: formData.resumeLink,
          cover_letter_link: formData.coverLetterLink || 'Not provided'
        },
        'DtG13YmoZDccI-GgA' 
      );

      alert('Application submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Error submitting application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // URL validation helper
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="application-form-overlay">
      <div className="application-form-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Apply for {jobTitle}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <PhoneInput
              country={'us'}
              value={formData.phone}
              onChange={(phone) => setFormData({...formData, phone})}
              inputProps={{
                required: true,
              }}
            />
          </div>

          <div className="form-group">
            <label>Resume Link * (Google Drive, Dropbox, etc.)</label>
            <input
              type="url"
              required
              value={formData.resumeLink}
              onChange={(e) => setFormData({...formData, resumeLink: e.target.value})}
              placeholder="https://drive.google.com/your-resume-link"
            />
            <p className="input-help">Please provide a public link to your resume</p>
          </div>

          <div className="form-group">
            <label>Cover Letter Link (Optional)</label>
            <input
              type="url"
              value={formData.coverLetterLink}
              onChange={(e) => setFormData({...formData, coverLetterLink: e.target.value})}
              placeholder="https://drive.google.com/your-cover-letter-link"
            />
            <p className="input-help">Optional: Provide a public link to your cover letter</p>
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
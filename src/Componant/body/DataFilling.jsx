// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PersonalDetails from './PersonalDetails';
import WorkExperience from './WorkExperience';
import KeySkills from './KeySkills';
import EducationDetails from './EducationDetails';
import Certification from './Certification';

function DataFilling() {
  const [showPersonalDetails, setShowPersonalDetails] = useState(true);
  const [showWorkExperience, setShowWorkExperience] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showKeySkill, setShowKeySkill] = useState(false);
  const [showCertification, setShowCertification] = useState(false);

  const handleNavClick = (event) => {
    event.preventDefault();
    const selectedComponent = event.target.pathname.slice(1);
    setShowPersonalDetails(selectedComponent === 'datafilling/:id/personaldetails');
    setShowWorkExperience(selectedComponent === 'datafilling/:id/workexperience');
    setShowEducation(selectedComponent === 'datafilling/:id/education');
    setShowKeySkill(selectedComponent === 'datafilling/:id/keyskill');
    setShowCertification(selectedComponent === 'datafilling/:id/certification');
  };

  return (
    <div className="container-md-fluid border text-wrap">
      <div className="container-md-fluid d-flex flex-wrap">
        <div className="flex-fill align-items-start shadow m-1">
          <div className="p-3"><Link to="/datafilling/:id/personaldetails" className={`nav-link ${showPersonalDetails ? 'active' : ''}`} onClick={handleNavClick}>Personal Details</Link></div>
          <div className="p-3"><Link to="/datafilling/:id/workexperience" className={`nav-link ${showWorkExperience ? 'active' : ''}`} onClick={handleNavClick}>Work Experience</Link></div>
          <div className="p-3"><Link to="/datafilling/:id/education" className={`nav-link ${showEducation ? 'active' : ''}`} onClick={handleNavClick}>Education</Link></div>
          <div className="p-3"><Link to="/datafilling/:id/keyskill" className={`nav-link ${showKeySkill ? 'active' : ''}`} onClick={handleNavClick}>Key Skill</Link></div>
          <div className="p-3"><Link to="/datafilling/:id/certification" className={`nav-link ${showCertification ? 'active' : ''}`} onClick={handleNavClick}>Certification</Link></div>
        </div>
        <div className="container-md-fluid mt-2 flex-fill shadow m-1">
          {showPersonalDetails && <PersonalDetails />}
          {showWorkExperience && <WorkExperience />}
          {showEducation && <EducationDetails />}
          {showKeySkill && <KeySkills />}
          {showCertification && <Certification />}
        </div>
      </div>
    </div>
  );
}

export default DataFilling;

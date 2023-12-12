// ReviewPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewPage1 = () => {
  const location = useLocation();
  const skills = location.state?.skills || [];
  const formData = location.state?.formData || {};
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/download');
  }

  if (!skills) {
    return <p>Loading...</p>; // or a loading/error message
  }

  const {
    firstname,
    lastname,
    email,
    tel,
    address,
    city,
    state,
    postalcode,
    object,
    profilePicture
  } = formData;

  return (
    <div>
        <h1>Review Data image 2</h1>
      <div>
        <h1>Personal Details</h1>
        <p>image:{profilePicture}</p>
        <p>First Name: {firstname}</p>
        <p>Last Name: {lastname}</p>
        <p>Email: {email}</p>
        <p>Mobile Number: {tel}</p>
        <p>Address: {address}</p>
        <p>City: {city}</p>
        <p>State: {state}</p>
        <p>Postal Code: {postalcode}</p>
        <p>Objective Career: {object}</p>
      </div>
      <div>
        <h2>Review</h2>
        {skills.map((skill, index) => (
          <p key={index}>Skill {index + 1}: {skill.value}</p>
        ))}
        <div>
          <button onClick={handleClick} value="download">
            Download
          </button>
        </div>
      </div>
      <div>
        <h2>Education</h2>
        {/* Display education information */}
        <p>Job Type: {formData.educationname}</p>
       
        <p>School/University: {formData.school}</p>
        <p>Degree: {formData.degree}</p>
        <p>Start Year: {formData.startYear}</p>
        <p>End Year: {formData.endYear}</p>
      </div>
      <div>
        <h2>Work Experience</h2>
        {/* Display work experience information */}
        
        <p>Job Title: {formData.jobTitle}</p>
        <p>Organization Name: {formData.organizationName}</p>
        <p>Start Year: {formData.workStartYear}</p>
        <p>End Year: {formData.workEndYear}</p>
      </div>
    </div>
  );
};

export default ReviewPage1;

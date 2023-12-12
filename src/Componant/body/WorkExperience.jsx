import React, { useContext, useState } from "react";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";
import FormContext from "../context/FormContext";

function WorkExperience() {
  const { formData, updateFormData } = useContext(FormContext);
  const [workExperiences, setWorkExperiences] = useState([
    { jobTitle: "", organizationName: "", workStartYear: "", workEndYear: "" },
  ]);
  const [showEducation, setShowEducation] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);

  const handleButtonClick = (event) => {
    event.preventDefault();
    const selectedComponent = event.target.value;

    if (selectedComponent === "personaldetails") {
      setShowPersonalDetails(true);
      setShowEducation(false);
    } else if (selectedComponent === "education") {
      setShowPersonalDetails(false);
      setShowEducation(true);
    }
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences[index][name] = value;

    setWorkExperiences(updatedWorkExperiences);
    const updatedFormData = {
      ...formData,
      workExperiences:updatedWorkExperiences
    }

    updateFormData({
      target: {
        name: 'formData',
        value: updatedFormData,
      },
    });
  };
  console.log('workExperiences:-',workExperiences)

  const handleAddExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      { jobTitle: "", organizationName: "", workStartYear: "", workEndYear: "" },
    ]);
  };

  let currentYear = new Date().getFullYear();
  let years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  return (
    <div>
      {showEducation && <EducationDetails />}
      {showPersonalDetails && <PersonalDetails />}
      {workExperiences && (
        <div>
          <h4>Work Experience</h4>
          {workExperiences && workExperiences.map((experience, index) => (
            <div key={`experience-${index}`} className="mt-5">
              <p>Experience {index + 1}</p>
              <hr />
              <br />

              <div className="d-flex justify-content-between">
                <div>
                  <label>Job Title</label>
                  <p>
                    <input
                      onChange={(e) => handleChange(e, index)}
                      type="text"
                      placeholder="Job Title"
                      name="jobTitle"
                      value={experience.jobTitle || ''}
                    />
                  </p>
                </div>
                <div>
                  <label>Organization Name</label>
                  <p>
                    <input
                      onChange={(e) => handleChange(e, index)}
                      type="text"
                      placeholder="Organization Name"
                      name="organizationName"
                      value={experience.organizationName || ''}
                    />
                  </p>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <label htmlFor={`startYear-${index}`}>Start Year: </label>
                  <p>
                    <select
                      name="workStartYear"
                      value={experience.workStartYear || ''}
                      onChange={(e) => handleChange(e, index)}
                    >
                      {years.map((year) => (
                        <option key={`start-year-${index}-${year}`} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </p>
                </div>

                <div>
                  <label htmlFor={`endYear-${index}`}>End Year: </label>
                  <p>
                    <select
                      name="workEndYear"
                      value={experience.workEndYear || ''}
                      onChange={(e) => handleChange(e, index)}
                    >
                      {years.map((year) => (
                        <option key={`end-year-${index}-${year}`} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button className="btn btn-primary btn-lg " onClick={handleAddExperience}>
              Add Experience
            </button>
          </div>
          <hr className="mb-5" />

          <div className="d-flex justify-content-between mt-5">
            <div>
              <button className="btn btn-primary btn-lg" onClick={handleButtonClick} value="personaldetails">
                Previous
              </button>
            </div>
            <div>
              <button className="btn btn-primary btn-lg" onClick={handleButtonClick} value="education">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkExperience;

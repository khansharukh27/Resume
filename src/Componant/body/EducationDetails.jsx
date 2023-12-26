import React, { useContext, useState } from "react";
import WorkExperience from "./WorkExperience";
import KeySkills from "./KeySkills";
import FormContext from "../context/FormContext";

function EducationDetails() {
  const { formData, updateFormData } = useContext(FormContext);
  const [educationSets, setEducationSets] = useState([
    {
      education: "",
      school: "",
      degree: "",
      startYear: "",
      endYear: "",
    },
  ]);
  const [showWorkExperience, setShowWorkExperience] = useState(false);
  const [showKeySkill, setShowKeySkill] = useState(false);
  const [showEducation, setShowEducation] = useState(true);

  const handleButtonClick = (event) => {
    event.preventDefault();
    const selectedComponent = event.target.value;
    if (selectedComponent === "education") {
      setShowEducation(true);
      setShowKeySkill(false);
      setShowWorkExperience(false);
    } else if (selectedComponent === "workexperience") {
      setShowEducation(false);
      setShowKeySkill(false);
      setShowWorkExperience(true);
    } else if (selectedComponent === 'keyskills') {
      setShowEducation(false);
      setShowKeySkill(true);
      setShowWorkExperience(false);
    }
    else if (selectedComponent === 'educationdetails') {
      setShowEducation(true);
      setShowKeySkill(false);
      setShowWorkExperience(false);
    }
  };

  const handleChange = (index, fieldName, event) => {
    const { value } = event.target;
    const updatedEducationSets = [...educationSets];
    updatedEducationSets[index] = { ...updatedEducationSets[index], [fieldName]: value };
    setEducationSets(updatedEducationSets)
    const updatedFormData = {
      ...formData,
      educationSets: updatedEducationSets,
    };
    updateFormData({
      target: {
        name: 'formData',
        value: updatedFormData,
      },
    });
  };

  const educationNames = ['High School', "Bachelor's Degree", "Master's Degree", 'Doctorate'];
  let currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, index) => currentYear - index);

  const handleAddMore = () => {
    setEducationSets([
      ...educationSets,
      {
        education: "",
        school: "",
        degree: "",
        startYear: "",
        endYear: "",
      },
    ]);
  };

  return (
    <div>
      {showWorkExperience && <WorkExperience />}
      {/* {showKeySkill && <KeySkills />} */}
      {showEducation && (
        <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {educationSets && educationSets.map((educationSet, setIndex) => (
            <div key={setIndex}>
              <h4>Education Details {setIndex + 1}</h4>
              <hr />

              <div>
                <div><label>Type:</label></div>
                <select
                  name="education"
                  value={educationSet.education}
                  onChange={(e) => handleChange(setIndex, 'education',e)}
                >
                  {educationNames.map((educationName, index) => (
                    <option key={index} value={educationName}>
                      {educationName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <div><label>University:</label></div>
                  <input
                    type="text"
                    placeholder="school"
                    name="school"
                    value={educationSet.school}
                    onChange={(e) => handleChange(setIndex,"school",e )}
                  />
                </div>

                <div>
                  <div><label>Degree:</label></div>
                  <input
                    type="text"
                    placeholder="Degree"
                    name="degree"
                    value={educationSet.degree}
                    onChange={(e) => handleChange(setIndex, 'degree',e )}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <div><label>Start Year:</label></div>
                  <select
                    name="startYear"
                    value={educationSet.startYear}
                    onChange={(e) => handleChange(setIndex, 'startYear', e)}
                  >
                    {years.map((year) => (
                      <option key={`start-year-${year}`} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div><label>End Year:</label></div>
                  <select
                    name="endYear"
                    value={educationSet.endYear}
                    onChange={(e) => handleChange(setIndex, 'endYear', e)}
                  >
                    {years.map((year) => (
                      <option key={`end-year-${year}`} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div>
                  <button className="btn btn-primary btn-lg" onClick={handleButtonClick} value="workexperience">
                    Previous
                  </button>
                </div>
                <div>
                  <button className="btn btn-primary btn-lg" onClick={handleButtonClick} value="keyskills">
                    Next
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  onClick={handleAddMore}
                >
                  Add More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
            {showKeySkill && <KeySkills />}

    </div>
  );
}

export default EducationDetails;

import React, { useContext, useState } from "react";
import PersonalDetails from "./PersonalDetails";
import EducationDetails from "./EducationDetails";
import FormContext from "../context/FormContext";

function WorkExperience() {
  const { formData, updateFormData } = useContext(FormContext);
  const [workInputs, setWorkInputs] = useState([
    {
      jobTitle: "",
      organizationName: "",
      startYear: "",
      endYear: "",
    },
  ]);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showWorkExperience, setShowWorkExperience] = useState(true);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newWorkInputs = [...workInputs];
    newWorkInputs[index][name] = value;
    setWorkInputs(newWorkInputs);
    // console.log(`Updated workInputs: ${JSON.stringify(newWorkInputs)}`);
    const updatedFormData = {
      ...formData,
      workInputs:newWorkInputs
    }
    
    updateFormData({
      target: {
        name: "formData",
        value: updatedFormData,
      
      },
    });
  
    console.log("Updated formData:", updatedFormData);
  };
  console.log("updated Inputs",workInputs)

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectComponent = e.target.value;
    if (selectComponent === "personalDetails") {
      setShowPersonalDetails(true);
      setShowEducation(false);
      setShowWorkExperience(false);
    } else if (selectComponent === "education") {
      setShowPersonalDetails(false);
      setShowEducation(true);
      setShowWorkExperience(false);
    }
    else if (selectComponent === "workexperience") {
      setShowPersonalDetails(false);
      setShowEducation(false);
      setShowWorkExperience(true);
    }
  };
  const handleMore = () => {
    setWorkInputs([...workInputs,{
      jobTitle: "",
      organizationName: "",
      startYear: "",
      endYear: "",
    }],)
  }
  const handleDelete = (index,e) => {
   const newDelete = [...workInputs]
    newDelete.splice(index,1)
    setWorkInputs(newDelete)
  }
  return (
    <div>
     
      {showPersonalDetails && <PersonalDetails />}
      {showEducation && <EducationDetails />}
      {showWorkExperience && (
        <div>
           <h4>Work Experience</h4>
          {workInputs.map((workInput, index) => (
            <div key={index}>
              <b>Experience {index + 1}</b>
              <input
                type="text"
                name="jobTitle"
                value={workInput.jobTitle}
                onChange={(e) => handleChange(index, e)}
              />
              <input
                type="text"
                name="organizationName"
                value={workInput.organizationName}
                onChange={(e) => handleChange(index, e)}
              />
              <input
                type="text"
                name="startYear"
                value={workInput.startYear}
                onChange={(e) => handleChange(index, e)}
              />
              <input
                type="text"
                name="endYear"
                value={workInput.endYear}
                onChange={(e) => handleChange(index, e)}
              />
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))}

          <div className="text-center mt-4">
            <button className="btn btn-primary btn-lg" onClick={handleMore}>Add More</button>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary btn-lg" onClick={handleSubmit} value='personalDetails'>Previous</button>
            <button className="btn btn-primary btn-lg" onClick={handleSubmit} value="education">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkExperience;

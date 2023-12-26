import React, { useContext, useState } from 'react';
import FormContext from '../context/FormContext';
import EducationDetails from './EducationDetails';
import Certification from './Certification';

function KeySkills() {
  const { formData, updateFormData } = useContext(FormContext);
  const [skills, setSkills] = useState([
    { name: `skill-1`, value: '' },
    { name: `skill-2`, value: '' },
  ]);

  const [showKeySkill, setShowKeySkill] = useState(true);
  const [showEducation, setShowEducation] = useState(false);
  const [showCertification, setShowCertification] = useState(false);

  
  const handleChange = (index, e) => {
    const {  value } = e.target;
    const newSkills = [...skills];
    newSkills[index].value = value;
    setSkills(newSkills);

    const updatedFormData = {
      ...formData,
      skills: newSkills,
    };

    updateFormData({
      target: {
        name: 'formData',
        value: updatedFormData,
      },
    });
  };
// console.log('skills:-',skills)
  const handleAddMore = () => {
    const newIndex = skills.length + 1;
    setSkills([...skills, { name: `Skill-${newIndex}`, value: '' }, { name: `Skill-${newIndex + 1}`, value: '' }]);
  };

  const handleSubmit = (e) => {
    const selectComponent = e.target.value
    e.preventDefault();
    if(selectComponent === 'certification'){

      setShowCertification(true)
      setShowKeySkill(false)
      setShowEducation(false)
    }else if(selectComponent === 'education'){
      setShowCertification(false)
      setShowEducation(true)
      setShowKeySkill(false)
    }else if(selectComponent === 'keyskills'){
      setShowCertification(false)
      setShowEducation(false)
      setShowKeySkill(true)
    }
    

    // Navigate to the next step (you may replace this with your navigation logic)
    // Example: history.push('/next-step');
  };

  return (
    <div>
      {showEducation && <EducationDetails />}
      {showCertification && <Certification />}

      {showKeySkill && (
        <div>
          Key Skills
          <hr />

          <div className="d-flex justify-content-between flex-wrap">
            {skills.map((skill, index) => (
              <div key={index} className="d-flex justify-content-between">
                <div>
                  <input
                    type="text"
                    placeholder={skill.name}
                    name={`skill${index + 1}`}
                    value={skill.value}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className=" mt-3">
            <button className="btn btn-primary btn-lg" type="button" onClick={handleAddMore}>
              Add More
            </button>
          </div>
          <hr className="mb-5" />
          <div className="d-flex justify-content-between mt-5">
            <button
              className="btn btn-primary btn-lg align-items-end"
              onClick={handleSubmit}
              value="education"
            >
              Previous
            </button>
            <button className="btn btn-primary btn-lg" type="submit" value="certification" onClick={handleSubmit}>
              Next
            </button>
            {/* Call handleSubmit when you want to navigate and submit data */}
          </div>
        </div>
      )}
    </div>
  );
}

export default KeySkills;

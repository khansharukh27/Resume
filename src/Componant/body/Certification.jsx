import React, { useContext, useState } from 'react';
import KeySkills from './KeySkills';
import FormContext from '../context/FormContext';
import { useNavigate } from 'react-router-dom';
// import workInpusts from './WorkExperience';
function Certification() {
  const { formData, updateFormData } = useContext(FormContext);
  const [showCertification, setShowCertification] = useState(true);
  const [showKeySkill, setShowKeySkill] = useState(false);
  const navigate = useNavigate()

  const [link, setLink] = useState([
    { name: 'link1', value: '' },
    { name: 'link2', value: '' },
  ]);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newCertification = [...link];
    newCertification[index] = { ...newCertification[index], value };
    setLink(newCertification);

    const updatedFormData = {
      ...formData,
      link: link,
    };

    updateFormData({
      target: {
        name: 'formData',
        value: updatedFormData,
      },
    });

  };

  const handleClick = () => {
    const newLink1 = link.length + 2;
    setLink([...link, { name: `skill${newLink1}`, value: '' }]);
  };

  const handleClickP = (e) => {
    e.preventDefault();
    setShowKeySkill(true);
    setShowCertification(false);
  };

  const handleClickN = () => {
    const selectImageId = formData.selectedImageId;
    const certifications = `/review/${selectImageId}`;
    // Update formData here, after setting link state
    // const updatedFormData = {
    //   ...formData,
    //   link: link,
    // };

    // updateFormData({
    //   target: {
    //     name: 'formData',
    //     value: updatedFormData,
    //   },
    // });

    // Navigate to the next page
    navigate(certifications, { state: {  formData } });
  };

    // Update the formData state with the current form data, including skills
    

  return (
    <div>
      {showKeySkill && <KeySkills />}
      {showCertification && (
        <div>
            <h2>Add Certification link</h2>
            <hr className="mt-5 mb-5"/>
          <div>
            {link.map((state, index) => (
              <div key={index} className="mt-4">
                <input
                  onChange={(e) => handleInputChange(e, index)}
                  value={state.value}
                  type="text"
                  name={state.name}
                  placeholder="Enter link"
                />
                {/* <input
                  onChange={(e) => handleInputChange(e, index)}
                  value={state.value}
                  type="text"
                  name={`skill${index * 2 + 2}`}
                  placeholder="Enter link"
                /> */}
              </div>
            ))}
          </div>
          <div className=" mt-5">
            <button className="btn btn-primary btn-lg" onClick={handleClick}>add link</button>
          </div>
          <hr className="mt-5 mb-5"/>
          <div className="mt-5 d-flex justify-content-between">
            <button className="btn btn-primary btn-lg" onClick={handleClickP} name="keyskills">Previous</button>
            <button className="btn btn-primary btn-lg" onClick={handleClickN}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certification;

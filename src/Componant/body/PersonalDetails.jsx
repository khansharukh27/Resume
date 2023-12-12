import React, { useContext, useState } from 'react';
import WorkExperience from './WorkExperience';
import FormContext from '../context/FormContext';
import { useNavigate } from 'react-router-dom';

function PersonalDetails() {
  const { formData, updateFormData } = useContext(FormContext);
  const [showWorkExperience, setShowWorkExperience] = useState(false);
  const [profilePicture, setProfilePicture] = useState(formData.profilePicture || null);
  const navigate = useNavigate();

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log("Next button clicked");
    setShowWorkExperience(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Updating ${name} with value: ${value}`);

    // Update formData with the selected value
    updateFormData({
      target: {
        name,
        value: value || '',
      },
    });
  };

  const handleChanges = (event) => {
    const file = event.target.files[0];

    // Check if a file is selected
    if (file) {
      setProfilePicture(URL.createObjectURL(file));

      // Update formData with the selected image
      updateFormData({
        target: {
          name: "profilePicture",
          value: file,
        },
      });
    }
  };

  const handleButtonClic = () => {
    navigate('/');
  };

  return (
    <div className='container-fluid'>
      {showWorkExperience && <WorkExperience />}

      {!showWorkExperience && (
        <div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            {/* Input for file selection */}
            <input
              onChange={handleChanges}
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              style={{
                border: "1px solid grey",
                height: "100px",
                width: "100px",
                borderRadius: '50%',
                position: 'relative',
                cursor: 'pointer'
              }}
            />
            {/* Visible image */}
            <div
              className="d-flex flex-column align-items-center"
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => document.getElementById('profilePicture').click()}
            >
              {profilePicture && (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="rounded-circle mb-2"
                  style={{ width: "100px", height: "100px", cursor: 'pointer', position: 'absolute', // Position the image absolutely
                  top: -100, // Place it at the top of the container
                  left: 0, // Place it at the left of the container
                }}
                />
              )}
              <label htmlFor="profilePicture" className="cursor-pointer">
                Change Profile Picture
              </label>
            </div>
          </div>
          <div className='d-flex mt-4'>
            <div className="mb-3  ">
              <label>First Name</label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstname"
                value={formData.firstname || ''}
              />
            </div>

            <div className="mb-3 ms-2">
              <label>Last Name</label>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastname"
                value={formData.lastname || ''}
              />
            </div></div>


                <div className='d-flex'>
                  <div className="mb-3">
            <label>Email</label>
            <input
              onChange={handleChange}
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email || ''}
            />
          </div>

          <div className="mb-3 ms-2">
            <label>Mobile number</label>
            <input
              onChange={handleChange}
              type="tel"
              className="form-control"
              placeholder="Mobile Number"
              name="tel"
              value={formData.tel || ""}
            />
          </div></div>
          

          <div className="mb-3">
            <label>Date of Birth</label>
            <textarea
              onChange={handleChange}
              type="text"
              rows='1'
              className="form-control"
              placeholder="Date of Birth"
              name="dateofbirth"
              value={formData.dateofbirth || ''}
            />
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <div className="w-45 me-2">
                <label>Language1</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Language1"
                  name="language1"
                  value={formData.language1 || ''}
                />
              </div>
              <div className="w-45">
                <label>Language2</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Language2"
                  name="language2"
                  value={formData.language2 || ''}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label>Address</label>
            <textarea
              onChange={handleChange}
              name="address"
              rows="1"
              className="form-control"
              placeholder="Enter your address"
              value={formData.address || ''}
            ></textarea>
          </div>

          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <div className="w-45 me-2">
                <label>City</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="City"
                  name="city"
                  value={formData.city || ''}
                />
              </div>
              <div className="w-45">
                <label>State</label>
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="State"
                  name="state"
                  value={formData.state || ''}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label>Postal code</label>
            <input
              onChange={handleChange}
              type="number"
              className="form-control"
              placeholder="Postal Code"
              name="postalcode"
              value={formData.postalcode || ''}
            />
          </div>

          <div className="mb-5">
            <label>Object Carrier</label>
            <textarea
              onChange={handleChange}
              type="text"
              rows='4'
              className="form-control"
              placeholder="Objective Career"
              name="object"
              value={formData.object || ''}
            ></textarea>
          </div>

          <hr className='mb-5' />

          <div className='d-flex justify-content-between'>
            <button className="btn btn-primary" type='button' onClick={handleButtonClic}> Back</button>
            <button className="btn btn-primary" type="button" onClick={handleButtonClick} >Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalDetails;

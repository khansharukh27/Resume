// Home.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageSources from './ImageSources';

import FormContext from '../context/FormContext';

function Home() {
  const { updateFormData } = useContext(FormContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (id) => {
    // Set the selectedImageId in the form data
    // Assuming formData is a state variable and updateFormData is a function to update it
    updateFormData({
      target: {
        name: 'selectedImageId',
        value: id,
      },
    });

    // Navigate to the DataFilling component with the selected image id
    navigate(`/datafilling/${id}/personaldetails`);
  }

  return (
    <div>
      
      <h1>Template</h1>
      <p>Select a template to get started</p>
      <div className="d-flex ms-2 me-2 mt-4" style={{ width: "100%" }}>
        {ImageSources.map((source) => (
          <div
            key={source.id}
            style={{ flex: "1", border: "1px solid grey" }}
            className="ms-2 ps-2 position-relative"
            onMouseEnter={() => setHoveredIndex(source.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={source.src}
              alt={`resume${source.id}`}
              style={{ height: "100%", width: "95%", objectFit: "cover" }}
            />
            {hoveredIndex === source.id && (
              <button
                className="btn btn-primary position-absolute top-50 start-50 translate-middle"
                onClick={() => handleButtonClick(source.id)}
              >
                Use Me
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

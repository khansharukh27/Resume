// MyResume.jsx
import React, { useState, useEffect } from "react";

const MyResume = () => {
  const [savedResumes, setSavedResumes] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    // Retrieve the list of saved resumes from local storage
    const storedResumes = JSON.parse(localStorage.getItem("savedResumes")) || [];
    setSavedResumes(storedResumes);
  }, []);

  const handleButtonClick = (index) => {
    // Remove the selected resume from the list
    const updatedResumes = savedResumes.filter((_, i) => i !== index);
    
    // Update the list in local storage
    localStorage.setItem("savedResumes", JSON.stringify(updatedResumes));

    // Update the state to trigger a re-render
    setSavedResumes(updatedResumes);
  };

  return (
    <div className="row">
      {savedResumes.map((item, index) => (
        <div
          className="col-lg-3 col-md-4 col-sm-6 col-12"
          key={index}
          style={{ marginBottom: "10px" }}
        >
          <div
            className="position-relative"
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={item}
              alt={`Saved Resume ${index + 1}`}
              style={{ maxWidth: "100%", height: "auto", marginBottom: "5px" }}
            />
            {hoveredIndex === index && (
              <button
                className="btn btn-primary"
                style={{ position: "absolute", bottom: "10px" }}
                onClick={() => handleButtonClick(index)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyResume;

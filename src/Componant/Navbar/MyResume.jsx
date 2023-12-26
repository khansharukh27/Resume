import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

  const handleSaveAsPDF = async (imageUrl) => {
    try {
      // Create a canvas from the image
      const canvas = await html2canvas(document.querySelector(`#resumeImage-${hoveredIndex}`));

      // Create a PDF document
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL("image/png");

      // Add the image to the PDF document
      pdf.addImage(imgData, "PNG", 10, 10);

      // Save the PDF
      pdf.save(`Resume_${hoveredIndex + 1}.pdf`);
    } catch (error) {
      console.error("Error saving as PDF:", error);
    }
  };

  return (
    <div className="row border ">
      {savedResumes.map((item, index) => (
        <div
          className="col-lg-3 col-md-4 col-sm-6 col-12"
          key={index}
          style={{ margin: "10px" ,  }}
        >
          <div
            className="position-relative"
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              id={`resumeImage-${index}`}
              src={item}
              alt={`Saved Resume ${index + 1}`}
              style={{ maxWidth: "100%", height: "auto", marginBottom: "" }}
            />
            {hoveredIndex === index && (
              <div className="d-flex justify-content-between">
                <div><button
                  className="btn btn-primary"
                  style={{ marginRight: "5px" }}
                  onClick={() => handleButtonClick(index)}
                >
                  Delete
                </button></div>
                <div><button
                  className="btn btn-primary"
                  onClick={() => handleSaveAsPDF(item)}
                >
                  Save as PDF
                </button></div>
                
                
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyResume;

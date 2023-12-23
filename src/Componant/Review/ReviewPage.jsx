import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FormContext from "../context/FormContext";
// import WorkExperience from "../body/WorkExperience";

const ReviewPage = () => {
  const { updatePdfData } = useContext(FormContext);
  const [myResumeValue, setMyResumeValue] = useState("");
  const location = useLocation();
  const formData = location.state?.formData?.formData || {};
  console.log('Received Form Data:', formData);

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
    profilePicture,
    // workInputs,
    language1,
    language2,
    dateofbirth,
  } = formData;
  const workInputs = formData.workInputs || [] ;
  const educationDetails = formData.educationDetails || [];
  const skills = formData.skills || [];
  const links = formData.link || [];
 
  console.log('workInputs:-', formData?.formData.workInputs || [] )

  console.log('education:-',  educationDetails )
  console.log('location:-', location)

  const navigate = useNavigate();

  useEffect(() => {
    const storedImage = localStorage.getItem("myResumeImage");
    if (storedImage) {
      setMyResumeValue(storedImage);
    }
  }, []);

  const handleSaveResume = async () => {
    try {
      const pdfElement = document.getElementById("alisha");
      const canvas = await html2canvas(pdfElement);
      const pdf = new jsPDF("p", "pt", "a4");
      const contentWidth = pdf.internal.pageSize.getWidth();
      const contentHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(
        contentWidth / canvas.width,
        contentHeight / canvas.height
      );

      pdf.addImage(
        canvas,
        "jpg",
        0,
        0,
        canvas.width * ratio,
        canvas.height * ratio
      );
      updatePdfData(pdf);

      const pdfBlob = pdf.output("blob");
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = `${myResumeValue || "Resume"}.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      const imageDataUrl = canvas.toDataURL("image/png");
      const savedResumes =
        JSON.parse(localStorage.getItem("savedResumes")) || [];
      savedResumes.push(imageDataUrl);
      localStorage.setItem("savedResumes", JSON.stringify(savedResumes));
      window.alert("Your resume is saved as a pdf");
      navigate("/myresume");
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  return (
    <div className="d-sm-flex">
      <div>
        <b style={{ color: "blue", whiteSpace: "nowrap", textOverflow: "ellipsis" }}> .Work Experience</b>
        {workInputs && workInputs.map((experience, index) => (
          <div key={index}>
            <p>Job Title: {experience.jobTitle}</p>
            <p>Organization Name: {experience.organizationName}</p>
            <p>Start Year: {experience.workStartYear}</p>
            <p>End Year: {experience.workEndYear}</p>
          </div>
        ))}
      </div>
      <div className="flex-fill" id="alisha">
        <div className="d-flex justify-content-between bg-primary">
          <div className="mt-4 p-2">
            {profilePicture && (
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile"
                style={{
                  border: "1px solid grey",
                  height: "100px",
                  width: "100px",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
          <div className="mt-5 me-2 pt-2">
            <h5 style={{ color: "black", whiteSpace: "nowrap" }}>
              {firstname} {lastname}
            </h5>


          </div>
          <div
            id="hello"
            className="ms-1 overflow-auto"
            style={{ whiteSpace: "break-spaces" }}
          >
            <div>
              <p>
                <span className="material-icons text-white">call</span>
                <br />
                <span className="material-icons">subdirectory_arrow_right</span>
                <span>{tel}</span>
              </p>
            </div>
            <div className="d-flex" style={{ wordBreak: "break-all" }}>
              <p className="">
                <span className="material-icons text-white">email</span>
                <br />
                <span className="material-icons">subdirectory_arrow_right</span>
                <span style={{}}>{email}</span>
              </p>
            </div>
            <div className="">
              <p className="" style={{ whiteSpace: "break-spaces" }}>
                <span className="material-icons text-white">home</span> <br />
                <span className="material-icons">subdirectory_arrow_right</span>
                <span className="" style={{}}>
                  {address} {city} {state} {postalcode}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex" style={{ border: "1px solid grey" }}>
          <div className="me-4">
            <b style={{ color: "blue", whiteSpace: "nowrap" }}>
              .Core Competency
            </b>
            <br />
            {links && links.map((stat, index) => <p key={index}>{stat.value}</p>)}
            <b style={{ color: "blue", whiteSpace: "nowrap" }}>
              .Technical Skills
            </b>{" "}
            <br />
            {skills &&
              skills.map((skill, index) => (
                <p key={index}>Skill {index + 1}: {skill.value}</p>
              ))}
            <b style={{ color: "blue", whiteSpace: "nowrap" }}>
              .Personal Details
            </b>{" "}
            <br />
            <p>Date Of Birth: {dateofbirth}</p>
            <p style={{ color: "blue" }}>Language</p>
            <p>1. {language1}</p>
            <p>2. {language2}</p>
          </div>
          <div className="vr border"></div>
          <div className="p">
            <div></div>
            <b className="" style={{ color: "blue", whiteSpace: "nowrap" }}>
              .Profile Objective
            </b>
            <br />
            <p>{object}</p>

            <div><b
              style={{ color: "blue", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
            >
              .Education
            </b>
              <br />
              {educationDetails &&
                educationDetails.map((educationSet, index) => (
                  <div key={index}>
                    <b>Course {index + 1}</b>
                    <hr />
                    <div>
                      <div className="d-flex justify-content-between">
                        <p
                          style={{
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          University: {educationSet.school} {educationSet.degree}
                        </p>
                        <p
                          style={{
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {educationSet.endYear}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}</div>

          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-12 text-center mt-5">
        <input
          className="me-2"
          type="text"
          name=""
          id=""
          value={myResumeValue}
          onChange={(e) => setMyResumeValue(e.target.value)}
        />
        <button
          className="btn btn-primary btn-sm"
          onClick={handleSaveResume}
        >
          Save in my resume
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;

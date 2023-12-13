import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FormContext from "../context/FormContext";

const ReviewPage = () => {
  const { updatePdfData } = useContext(FormContext);
  const [myResumeValue, setMyResumeValue] = useState("");
  const location = useLocation();
  const formData = location.state?.formData?.formData || {};
  const { firstname, lastname, email, tel, address, city, workExperiences, state, postalcode, object, profilePicture, language1, language2, dateofbirth } = formData || {};
  const edu = formData?.EducationDetails || [];
  const skills = formData?.formData?.skills || [];
  const links = formData?.formData?.link || [];
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
      const savedResumes = JSON.parse(localStorage.getItem("savedResumes")) || [];
      savedResumes.push(imageDataUrl);
      localStorage.setItem("savedResumes", JSON.stringify(savedResumes));
      window.alert("Your resume is saved as a pdf");
      navigate("/myresume");
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  return (
    <div className="container-fluid d-sm-flex ">
      <div className="container-fluid " id="alisha">
        <div className="d-flex  bg-primary p ">
          <div className="mt-2 p-2">
            {profilePicture && (
              <img
                src={URL.createObjectURL(profilePicture)}
                alt="Profile"
                className="" // Use Bootstrap img-fluid class for responsive images
                style={{ border: "1px solid grey", height: '100px', width: '100px', borderRadius: "50%" }}
              />
            )}
          </div>
          <div className="mt-2 pt-5 p-1">
            <h5 style={{ color: "black", whiteSpace: "nowrap" }}>
              {firstname} {lastname}
            </h5>
            <p style={{ color: "", whiteSpace: "nowrap" }}>
              as a {workExperiences?.[0]?.jobTitle}
            </p>
          </div>
          <div id="hello" className="mt-2 " style={{ }}>
            <p style={{ whiteSpace: '' }}>
              <span className="material-icons text-white">call</span> {tel}
            </p>
            <p className='' style={{ overflowWrap: 'break-word' }}>
              <span className="material-icons text-white">email</span> {email}
            </p>
            <p className='container-sm' style={{ overflowWrap: 'break-word' }}>
  <span className="material-icons text-white">home</span>
  <span className="d-xl-inline d-block">
    {address} {city} {state} {postalcode}
  </span>
</p>
          </div>

        </div>

        <div className="d-flex  " style={{ border: "1px solid grey" }}>
          <div className="me-4">
            <b style={{ color: "blue", whiteSpace: 'nowrap' }}>.Core Competency</b> <br />
            {links && links.map((stat, index) => (
              <p key={index}>{stat.value}</p>
            ))}
            <b style={{ color: "blue", whiteSpace: 'nowrap' }}>.Technical Skills</b> <br />
            {skills && skills.map((skill, index) => (
              <p key={index}>Skill {index + 1}: {skill.value}</p>
            ))}
            <b style={{ color: "blue", whiteSpace: 'nowrap' }}>.Personal Details</b> <br />
            <p>Date Of Birth: {dateofbirth}</p><br />
            <p style={{ color: "blue" }}>Language</p><br />
            <p>1. {language1}</p>
            <p>2. {language2}</p>
          </div>
          <div className="vr border"></div>
          <div className="p">
            <b className='' style={{ color: "blue", whiteSpace: 'nowrap' }}>.Profile Objective</b><br />
            <p>{object}</p>

            <b style={{ color: "blue", whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>.Education</b><br />
            {edu && edu.map((educationSet, index) => (
              <div key={index}>
                <b>Course {index + 1}</b>
                <hr />
                <div>
                  <div className="d-flex justify-content-between">
                    <p style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      University: {educationSet.school} {educationSet.degree}</p>
                    <p style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {educationSet.endYear}</p>
                  </div>
                </div>
              </div>
            ))}
            <div></div>

            <b style={{ color: "blue", whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>.Work Experience</b>
            {workExperiences && workExperiences.map((experience, index) => (
              <div key={index}>
                <p>Job Title: {experience.jobTitle}</p>
                <p>Organization Name: {experience.organizationName}</p>
                <p>Start Year: {experience.workStartYear}</p>
                <p>End Year: {experience.workEndYear}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-12 text-center mt-5">
        <input className="me-2" type="text" name="" id="" value={myResumeValue} onChange={(e) => setMyResumeValue(e.target.value)} />
        <button className="btn btn-primary btn-sm" onClick={handleSaveResume}>Save in my resume</button>
      </div>
    </div>
  );
};

export default ReviewPage;

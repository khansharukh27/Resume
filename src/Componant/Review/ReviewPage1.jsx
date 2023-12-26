// ReviewPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormContext from "../context/FormContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const ReviewPage1 = () => {
  const { updatePdfData } = useContext(FormContext)
  const [myResumeValue, setMyResumeValue] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const location = useLocation();
  const formData = location.state?.formData?.formData || {};
  const navigate = useNavigate();

  const {
    firstname,
    lastname,
    email,
    tel,
    address,
    city,
    state,
    postalcode,
    language1,
    language2,
    object,
    profilePicture,
    // workInputs,
  } = formData;
  console.log('formData:-', formData)
  const skills = formData.formData.skills || [];
  const educationDetail = formData.formData.formData.educationSets;
  const workInputs = formData.workInputs
  console.log("educationDetails:-", educationDetail)
  console.log('workInputs:-', formData.formData.formData.workInput)
  // console.log('skills:-', skills)

  useEffect(() => {
    const storedImage = localStorage.getItem('myResumeImage')
    if (storedImage) {
      setMyResumeValue(storedImage)

    }
  }, [])
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
      // window.alert("Your resume is saved as a pdf");
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 2000)
      navigate("/myresume");
    } catch (error) {
      console.error("Error saving resume:", error);
    }


  };
  console.log()


  return (
    <div className="d-sm-flex " style={{}}>
      <div className="d-flex border " id="alisha">
        <div className="mt p-4 " style={{ backgroundColor: 'black', color: 'white' }}>
          <div style={{}}>
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
          <div className="mt-4">
            <h6> <b>Contact</b></h6>
            <hr />
            <b>Phone</b><br />
            {tel} <br />
            <b>Email</b><br />
            {email} <br />
            <b>Address</b><br />
            {address} {city} {state} {postalcode}

          </div>
          <div>
            <hr />
            {educationDetail && educationDetail.map((education, index) => (
              <div key={index}>
                <h6>Education {index + 1}</h6>
                <p>{education.endYear}</p>
                <p>{education.degree}</p>
                <p>{education.education}</p>
              </div>
            ))}

          </div>
          <div>
            <h6>Expertise</h6>
            {skills.map((skill, index) => (
              <div key={index}>

                <p > <b>.</b> {skill.value}</p>
              </div>

            ))}
          </div>
          <div>
            <h4>Language</h4><hr /><br />
            <p> <b>.</b> {language1}</p>
            <p><b>.</b>{language2}</p>

          </div>

        </div>
        <div class={`alert alert-success ${showAlert ? 'block' : 'd-none'}`} role="alert" >
          <h4 class="alert-heading">Well done!</h4>
          <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
          <hr />
          <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        </div>

        <div className="mt-4 p-2 ">
          <h1 style={{ whiteSpace: "nowrap" }}>{firstname} {lastname}</h1>
          <p>{workInputs && workInputs[0].jobTitle1}</p>
          <br />
          <p>{object}</p>

          <div>
            <h6>Experience</h6>
            {workInputs && workInputs.map((work, index) => (
              <div key={index}>
                {workInputs && <p>{work.startYear1}-{work.endYear1}</p>}
                {workInputs && <p>{work.organizationName1}</p>}
                {workInputs && <p>{work.jobTitle1}</p>}

              </div>
            ))}
          </div>

        </div>
      </div>
      <div className="d-flex border mt-sm-2"  >
        <div><input type="text" /></div>
        <div className="ms-2" onClick={handleSaveResume} style={{ whiteSpace: "nowrap" }}><button>Save Resume</button></div>

      </div>
    </div>
  );
};

export default ReviewPage1;

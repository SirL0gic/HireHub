//Module Imports
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import UploadModal from "./Cv";
import JobCard from "./joblist";

//Styling
import "../App.css";

let MainPage = () => {

  // Bool for modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Date
  var date = new Date();
  var dateString = date.toLocaleDateString("en-GB");


// get all job listings from the DB
const [joblist, setJobList] = [
  {
      ID: 1,
      Title: "Software Engineer",
      Date: dateString,
      Company: "ABC Inc.",
      Location:"",
      Position: "Full-time",
      Description: "Developed and maintained software applications for clients",
      Contact: "John Doe (john.doe@abcinc.com)",
      Image:"",
      },
      
      {
      ID: 2,
      Title: "Marketing Manager",
      Date: dateString,
      Company: "XYZ Corp.",
      Location:"",
      Position: "Contract",
      Description: "Developed and executed marketing campaigns for new product launches",
      Contact: "Jane Smith (jane.smith@xyzcorp.com)",
      Image:"",
      },
      
      {
      ID: 3,
      Title: "Sales Associate",
      Date: dateString,
      Company: "123 Enterprises",
      Location:"",
      Position: "Part-time",
      Description: "Assisted customers with purchases and maintained store inventory",
      Contact: "Mark Johnson (mark.johnson@123enterprises.com)",
      Image:"",
      },
      
      {
      ID: 4,
      Title: "Human Resources Manager",
      Date: dateString,
      Company: "Acme Corporation",
      Location:"",
      Position: "Full-time",
      Description: "Managed employee relations, benefits, and performance evaluations",
      Contact: "Sara Lee (sara.lee@acmecorp.com)",
      Image:"",
      },
      
      {
      ID: 5,
      Title: "Graphic Designer",
      Date: dateString,
      Company: "Design Co.",
      Location:"",
      Position: "Freelance",
      Description: "Created designs for various marketing and advertising materials",
      Contact: "Mike Brown (mike.brown@designco.com)",
      Image:"",
      },
];

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Container fluid className="main-container">
      <Row className="row-one">
        <Col className="col-one" sm={1} md={4} lg={1}>
          <div className="navigation">
            <button className="feed-button">
              <img className="feed-image" alt="image-icon" src="/job.png" />
            </button>
            <button className="apply-button" onClick={openModal}>
              <img className="apply-image" alt="image-icon" src="/cv.png" />
            </button>
            <UploadModal isOpen={modalIsOpen} onRequestClose={closeModal} />
          </div>
        </Col>
        <Col className="col-two" sm={4} md={4} lg={4}>
          <JobCard Image="/person.png" Title="Data Scientist" Company="Microsoft" Location="Dubai"/>
        </Col>
        <Col className="col-three" sm={7} md={4} lg={7}></Col>
      </Row>
    </Container>
  );
};

export default MainPage;

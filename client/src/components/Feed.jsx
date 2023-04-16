//Module Imports
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import UploadModal from "./CV";
import JobCard from "./JobList";
import SearchBar from "./Search";

//Styling
import "../App.css";

let MainPage = () => {
  //Date
  var date = new Date();
  var dateString = date.toLocaleDateString("en-GB");

  // Bool for modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // get all job listings from the DB
  const [joblist, setJobList] = useState([
    {
      ID: 1,
      Title: "Software Engineer",
      Date: dateString,
      Company: "ABC Inc.",
      Location: "Dubai",
      Position: "Full-time",
      Description: "Developed and maintained software applications for clients",
      Contact: "John Doe (john.doe@abcinc.com)",
      Image: "/person.png",
    },

    {
      ID: 2,
      Title: "Marketing Manager",
      Date: dateString,
      Company: "XYZ Corp.",
      Location: "Dubai",
      Position: "Contract",
      Description:
        "Developed and executed marketing campaigns for new product launches",
      Contact: "Jane Smith (jane.smith@xyzcorp.com)",
      Image: "/person.png",
    },

    {
      ID: 3,
      Title: "Sales Associate",
      Date: dateString,
      Company: "123 Enterprises",
      Location: "Dubai",
      Position: "Part-time",
      Description:
        "Assisted customers with purchases and maintained store inventory",
      Contact: "Mark Johnson (mark.johnson@123enterprises.com)",
      Image: "/person.png",
    },

    {
      ID: 4,
      Title: "Human Resources Manager",
      Date: dateString,
      Company: "Acme Corporation",
      Location: "Dubai",
      Position: "Full-time",
      Description:
        "Managed employee relations, benefits, and performance evaluations",
      Contact: "Sara Lee (sara.lee@acmecorp.com)",
      Image: "/person.png",
    },

    {
      ID: 5,
      Title: "Graphic Designer",
      Date: dateString,
      Company: "Design Co.",
      Location: "Dubai",
      Position: "Freelance",
      Description:
        "Created designs for various marketing and advertising materials",
      Contact: "Mike Brown (mike.brown@designco.com)",
      Image: "/person.png",
    },
  ]);



  // state to hold filtered job listings
  const [filteredJobs, setFilteredJobs] = useState(joblist);

  // function to filter job listings based on search term
  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredJobs(joblist);
    } else {
      const filtered = joblist.filter((job) => {
        const titleMatch = job.Title.toLowerCase().includes(
          searchTerm.toLowerCase()
        );
        const companyMatch = job.Company.toLowerCase().includes(
          searchTerm.toLowerCase()
        );
        const locationMatch = job.Location.toLowerCase().includes(
          searchTerm.toLowerCase()
        );
        const positionMatch = job.Position.toLowerCase().includes(
          searchTerm.toLowerCase()
        );
        return titleMatch || companyMatch || locationMatch || positionMatch;
      });
      setFilteredJobs(filtered);
    }
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
          <div className="search-container">
            <img className="search-image" alt="image-icon" src="/search.png" />
            <SearchBar handleSearch={handleSearch} />
          </div>
          <ul className="render-list">
            {filteredJobs.map((eachitem, index) => {
              return (
                <li key={index}>
                  <JobCard
                    Image={eachitem.Image}
                    Title={eachitem.Title}
                    Company={eachitem.Company}
                    Location={eachitem.Location}
                  />
                </li>
              );
            })}
          </ul>
        </Col>
        <Col className="col-three" sm={7} md={4} lg={7}></Col>
      </Row>
    </Container>
  );
};

export default MainPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import UploadModal from "./CV";
import JobCard from "./JobList";
import SearchBar from "./Search";
import Post from "./NewJob";
import AllInformationCard from "./Information";

import "../App.css";

let MainPage = () => {
  //Date
  var date = new Date();
  var dateString = date.toLocaleDateString("en-GB");

  // Bool for cv modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //Bool for new job modal
  const [postModalIsOpen, setPostModalIsOpen] = useState(false);

  const openPostModal = () => {
    setPostModalIsOpen(true);
  };

  const closePostModal = () => {
    setPostModalIsOpen(false);
  };

  // get all job listings from the DB
  const [joblist, setJobList] = useState([]);

  // state to hold filtered job listings
  const [filteredJobs, setFilteredJobs] = useState([]);

  // function to filter job listings based on search term
  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredJobs(joblist);
    } else {
      const filtered = joblist.filter((job) =>
        job.Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  axios.defaults.baseURL = "http://18.222.113.94";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get-all-jobs");
        setJobList(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [allJobInfo, setallJobInfo] = useState("");

  let handlejobclick = (index, item) => {
    setallJobInfo(item);
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
          <div className="upper-box">
            <div className="search-container">
              <img
                className="search-image"
                alt="image-icon"
                src="/search.png"
              />
              <SearchBar handleSearch={handleSearch} />
            </div>
            <button className="new-job-form-button" onClick={openPostModal}>
              <img className="add-image" alt="image-icon" src="/add.png" />
            </button>
            <Post
              isOpenJobForm={postModalIsOpen}
              onRequestCloseJobForm={closePostModal}
            />
          </div>
          <div className="job-list-container">
            <ul className="render-list">
              {filteredJobs.map((eachitem, index) => {
                return (
                  <li key={index}>
                    <JobCard
                      index={index}
                      item={eachitem}
                      Image={eachitem.Image}
                      Title={eachitem.Title}
                      Company={eachitem.Company}
                      Location={eachitem.Location}
                      onClick={(index, item) => handlejobclick(index, item)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
        <Col className="col-three" sm={7} md={4} lg={7}>
          <AllInformationCard
            Title={allJobInfo.Title}
            Company={allJobInfo.Company}
            Location={allJobInfo.Location}
            Position={allJobInfo.Position}
            Description={allJobInfo.Description}
            Date={allJobInfo.Date}
            Contact={allJobInfo.Contact}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;

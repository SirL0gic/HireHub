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
  // Date
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

  // Bool for new job modal
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

  // state for selected job information
  const [selectedJobInfo, setSelectedJobInfo] = useState(null);

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

  const handleJobClick = (index, item) => {
    setSelectedJobInfo(item);
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
                      onClick={handleJobClick}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </Col>
        <Col className="col-three" sm={7} md={4} lg={7}>
          {selectedJobInfo && (
            <AllInformationCard
              Title={selectedJobInfo.Title}
              Company={selectedJobInfo.Company}
              Location={selectedJobInfo.Location}
              Position={selectedJobInfo.Position}
              Description={selectedJobInfo.Description}
              Date={selectedJobInfo.Date}
              Contact={selectedJobInfo.Contact}
            />
          )}
        </Col>
      </Row>
      {/* Modal for mobile */}
      {selectedJobInfo && (
        <div className="modal-container">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setSelectedJobInfo(null)}
            >
              Close
            </button>
            <AllInformationCard
              Title={selectedJobInfo.Title}
              Company={selectedJobInfo.Company}
              Location={selectedJobInfo.Location}
              Position={selectedJobInfo.Position}
              Description={selectedJobInfo.Description}
              Date={selectedJobInfo.Date}
              Contact={selectedJobInfo.Contact}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default MainPage;

// IGNORE THE below


// 1. **Added a state variable `selectedJobInfo` to store the selected job information when clicking on a `JobCard` component**: This means that a new state variable called `selectedJobInfo` is introduced in the component. It will be used to store the information of the job that the user selects by clicking on a `JobCard` component.

// 2. **Modified the `handleJobClick` function to set the selected job information in the `selectedJobInfo` state**: The `handleJobClick` function is responsible for updating the `selectedJobInfo` state when a `JobCard` component is clicked. It sets the value of `selectedJobInfo` to the information of the job that was clicked.

// 3. **Conditionally rendered the `AllInformationCard` component inside the `col-three` column only if `selectedJobInfo` is not null**: This means that the `AllInformationCard` component will only be displayed inside the `col-three` column if there is a selected job stored in the `selectedJobInfo` state. If `selectedJobInfo` is null (no job is selected), the `AllInformationCard` component will not be rendered.

// 4. **Added a new `<div>` block after the `Row` component to create a modal container for mobile devices**: A new `<div>` block is inserted after the `Row` component to serve as a container for the modal. This container will be used specifically for mobile devices.

// 5. **Conditionally rendered the modal container and its content only if `selectedJobInfo` is not null**: This means that the modal container and its content (including the `AllInformationCard` component) will only be displayed if there is a selected job stored in the `selectedJobInfo` state. If `selectedJobInfo` is null, the modal container will not be rendered.

// 6. **Added a close button inside the modal content to allow users to close the modal**: The modal content, displayed when a job is selected, includes a close button. This button allows users to close the modal by clicking on it, thereby hiding the selected job information.

// In summary, these changes enable the selection of a job from the `JobCard` component, display its details in the `AllInformationCard` component, and show a modal container on mobile devices to present the selected job information. The modal can be closed using the provided close button.

//Module Imports
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

//Styling
import "../App.css";

let Post = ({ isOpenJobForm, onRequestCloseJobForm }) => {
  // useState to store values from the form.
  //Date
  var date = new Date();
  var dateString = date.toLocaleDateString("en-GB");

  const [submitted, setSubmitted] = useState(false); // Added a state variable to track the submission status

  const [formData, setFormData] = useState({
    Title: "",
    Company: "",
    Location: "",
    Position: "",
    Date: dateString,
    Description: "",
    Contact: "",
    Image: "/person.png",
  });

  useEffect(() => {
    if (!isOpenJobForm) {
      setSubmitted(false); // Reset the submission status when the modal is closed
    }
  }, [isOpenJobForm]);

  // updates the form data state using a functional update based on the current input element value.
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    axios.defaults.baseURL = "http://18.222.113.94";
    axios
      .post("/api/upload-job-data", formData)
      .then((response) => {
        console.log(response);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Move the conditional check outside of the handleSubmit function
  if (!isOpenJobForm || submitted) {
    return null; // If the form is submitted or the modal is not open, the component returns null, effectively closing the modal/form
  }

  return (
    <Modal
      isOpen={isOpenJobForm}
      onRequestClose={onRequestCloseJobForm}
      contentLabel="New Job Post Modal"
      className="upload-modal-job-post"
      overlayClassName="upload-modal-overlay-job-post"
      ariaHideApp={false}
    >
      <span className="close" onClick={onRequestCloseJobForm}>
        &times;
      </span>
      <h2 className="new-job-post-form-title">New Job Post</h2>

      <form className="modal-form-job-post" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="Title">Title:</label>
          <input
            type="text"
            id="title"
            name="Title"
            value={formData.Title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="Company">Company:</label>
          <input
            type="text"
            id="company"
            name="Company"
            value={formData.Company}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="Location">Location:</label>
          <input
            type="text"
            id="location"
            name="Location"
            value={formData.Location}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="Position">Position:</label>
          <select
            id="position"
            name="Position"
            value={formData.Position}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="Description">Description:</label>
          <textarea
            id="description"
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="Contact">Contact:</label>
          <input
            type="email"
            id="contact"
            name="Contact"
            value={formData.Contact}
            onChange={handleInputChange}
          />
        </div>
        <div className="btn-container">
          <button className="btn-sub" type="submit">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Post;

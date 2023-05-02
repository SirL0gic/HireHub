//Module Imports
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

//Styling
import "../App.css";

let Post = ({ isOpenJobForm, onRequestCloseJobForm }) => {
  // useState to store values from the form.
  //Date
  var date = new Date();
  var dateString = date.toLocaleDateString("en-GB");

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    position: "",
    date: dateString,
    description: "",
    contact: "",
    image:"/person.png",
  });

  // updates the form data state using a functional update based on the current input element value.
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // updates the form data state using a functional update based on the current input element value.
  // const handleLocationInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     location: {
  //       ...prevFormData.location,
  //       [name]: value,
  //     },
  //   }));
  // };

  let handleSubmit = (event) => {
    event.preventDefault();
    // Check if all fields are filled
    // if (!formData.Title || !formData.Company || !formData.Country || !formData.City || !formData.Position || !formData.Description || !formData.Contact) {
    //   alert("Please fill in all fields.");
    //   return;
    // }
    // Send form data to backend using Axios
    axios.defaults.baseURL = "http://localhost:4000";
    axios
      .post("/upload-job-data", formData)
      .then((response) => {
        console.log(response);
        // handle response as needed
      })
      .catch((error) => {
        console.log(error);
        // handle error as needed
      });
  };

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
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="Company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="Location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="form-control">
          <label htmlFor="Country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleLocationInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="City">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleLocationInputChange}
          />
        </div> */}
        <div className="form-control">
          <label htmlFor="Position">Position:</label>
          <select
            id="position"
            name="position"
            value={formData.position}
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
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="Contact">Contact:</label>
          <input
            type="email"
            id="contact"
            name="contact"
            value={formData.contact}
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

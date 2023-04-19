import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

//Styling
import "../App.css";

let Post = ({ isOpenJobForm, onRequestCloseJobForm }) => {
  // useState to store values from the form.
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: {
      country: "",
      city: "",
    },
    position: "",
    description: "",
    contact: "",
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
  const handleLocationInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: {
        ...prevFormData.location,
        [name]: value,
      },
    }));
  };

  let handleSubmit = (event) => {
    event.preventDefault();
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
      <h2>New Job Post</h2>

      <form className="modal-form-job-post" onSubmit={handleSubmit}>
        <div className="form-control">
          <labal htmlFor="Title">Title:</labal>
          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
        <label htmlFor="Company">Company:</label>
        <input
          type="text"
          id="Company"
          name="Company"
          value={formData.Company}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="Country">Country:</label>
        <input
          type="text"
          id="Country"
          name="Country"
          value={formData.Country}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="City">City:</label>
        <input
          type="text"
          id="City"
          name="City"
          value={formData.City}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="Position">Position:</label>
        <select
          id="Position"
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
          id="Description"
          name="Description"
          value={formData.Description}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="Contact">Contact:</label>
        <input
          type="email"
          id="Contact"
          name="Contact"
          value={formData.Contact}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default Post;

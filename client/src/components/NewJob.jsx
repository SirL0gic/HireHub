import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

//Styling
import "../App.css";

let Post = ({ isOpenJobForm, onRequestCloseJobForm }) => {

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

      <form className="modal-form-job-post" onSubmit={handleSubmit}
      ></form>
    </Modal>
  );
};

export default Post;

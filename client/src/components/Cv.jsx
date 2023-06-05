//Module Imports
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

//Styling
import "../App.css";

const UploadModal = ({ isOpen, onRequestClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      axios.defaults.baseURL = "http://18.222.113.94";
      const response = await axios.post("/api/upload", formData);
      console.log(response.data);
      alert("File uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Error uploading file.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Upload Modal"
      className="upload-modal"
      overlayClassName="upload-modal-overlay"
      ariaHideApp={false}
    >
      <span className="close" onClick={onRequestClose}>
        &times;
      </span>
      <h3 className="cv-upload-title">Upload PDF</h3>
      <form className="modal-form">
        <input className="modal-form-input" type="file" onChange={handleFileSelect} />
        <button className="modal-form-button" type="button" onClick={handleUpload}>
          Upload
        </button>
      </form>
    </Modal>
  );
};

export default UploadModal;

import React from "react";
import "../App.css";

let Modal = (props) => {
  const handleFileInputChange = (event) => {
    props.setFile(event.target.files[0]);
  };

  const handleCloseClick = () => {
    props.onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCloseClick}>
          &times;
        </span>
        <h2>Upload PDF</h2>
        <form onSubmit={props.onSubmit}>
          <input type="file" onChange={handleFileInputChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;

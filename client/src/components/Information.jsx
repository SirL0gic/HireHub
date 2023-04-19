//Module Imports
import React, { useState } from "react";

//Styling
import "../App.css";

let AllInformationCard = ({ Title, Company, Location, Position, Description, Contact }) => {
    return (
    <div className="all-info-box">
        <p><strong>Title:</strong> {Title}</p>
        <p><strong>Company:</strong> {Company}</p>
        <p><strong>Location:</strong> {Location}</p>
        <p><strong>Position:</strong> {Position}</p>
        <p><strong>Description:</strong> </p>
        <p>{Description}</p>
        <p><strong>Contact:</strong> {Contact}</p>
    </div>
  
    );
};

export default AllInformationCard;
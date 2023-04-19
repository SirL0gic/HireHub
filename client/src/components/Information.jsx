//Module Imports
import React, { useState } from "react";

//Styling
import "../App.css";

let AllInformationCard = ({ Title, Company, Location, Position, Date, Description, Contact }) => {
    return (
    <div className="all-info-box">
        <h1>{Title}</h1>
        <br/>
        <p><strong>Company:</strong> {Company}</p>
        <p><strong>Location:</strong> {Location}</p>
        <p><strong>Position:</strong> {Position}</p>
        <p><strong>Date:</strong> {Date}</p>
        <p><strong>Description:</strong> </p>
        <p>{Description}</p>
        <p><strong>Contact:</strong> {Contact}</p>
    </div>
  
    );
};

export default AllInformationCard;
//Module Imports
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

let JobCard = () => {

    var date = new Date();
    var dateString = date.toLocaleDateString("en-GB");

  const [joblist, setJobList] = [
    {
        ID: 1,
        Title: "Software Engineer",
        Date: dateString,
        Company: "ABC Inc.",
        Location:"",
        Position: "Full-time",
        Description: "Developed and maintained software applications for clients",
        Contact: "John Doe (john.doe@abcinc.com)",
        Image:"",
        },
        
        {
        ID: 2,
        Title: "Marketing Manager",
        Date: dateString,
        Company: "XYZ Corp.",
        Location:"",
        Position: "Contract",
        Description: "Developed and executed marketing campaigns for new product launches",
        Contact: "Jane Smith (jane.smith@xyzcorp.com)",
        Image:"",
        },
        
        {
        ID: 3,
        Title: "Sales Associate",
        Date: dateString,
        Company: "123 Enterprises",
        Location:"",
        Position: "Part-time",
        Description: "Assisted customers with purchases and maintained store inventory",
        Contact: "Mark Johnson (mark.johnson@123enterprises.com)",
        Image:"",
        },
        
        {
        ID: 4,
        Title: "Human Resources Manager",
        Date: dateString,
        Company: "Acme Corporation",
        Location:"",
        Position: "Full-time",
        Description: "Managed employee relations, benefits, and performance evaluations",
        Contact: "Sara Lee (sara.lee@acmecorp.com)",
        Image:"",
        },
        
        {
        ID: 5,
        Title: "Graphic Designer",
        Date: dateString,
        Company: "Design Co.",
        Location:"",
        Position: "Freelance",
        Description: "Created designs for various marketing and advertising materials",
        Contact: "Mike Brown (mike.brown@designco.com)",
        Image:"",
        },
  ];

//PLEASE REFER CODESAND BOX, ANOTHE COMPONETN NEEDS TO BE MADE. which will render everything

  return (
    <>
    <Container>
        <Row>
            <Col><img src="" alt=""/></Col>
            <Col><h3></h3></Col>
        </Row>
    </Container>
    </>
  )
};

export default JobCard;

//Module Imports
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import Modal from "./CV";

//Styling
import "../App.css";

let MainPage = () => {


    return (
        <Container fluid className="main-container">
        <Row className="row-one">
          <Col className="col-one" sm={1} md={4} lg={1}>
            <div className="navigation">
              <button className="feed-button">
                <img
                  className="feed-image"
                  alt="image-icon"
                  src="/job.png"
                />
              </button>
              <button className="apply-button">
              <img
                  className="apply-image"
                  alt="image-icon"
                  src="/cv.png"
                />
              </button>
            </div>
          </Col>
          <Col className="col-two" sm={4} md={4} lg={4}></Col>
          <Col className="col-three" sm={7} md={4} lg={7}></Col>
        </Row>
      </Container>
    )
};

export default MainPage;
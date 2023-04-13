//Module Imports
import { Container, Row, Col } from "react-bootstrap";

//Styling
import "../App.css";

let JobCard = (props) => {
  return (
    <>
      <Container className="job-card-container">
        <Row>
          <Col sm={1} md={4} lg={1} className="job-card-col-one">
            <img className="job-card-image" src={props.Image} alt="pic" />
          </Col>
          <Col>
            <p>{props.Title}</p>
            <p>{props.Company}</p>
            <p>{props.Location}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JobCard;

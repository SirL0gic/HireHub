//Module Imports
import { Container, Row, Col } from "react-bootstrap";

//Styling
import "../App.css";

let JobCard = (props) => {
  return (
    <>
      <Container className="job-card-container">
        <Row>
          <Col  lg={1} className="job-card-col-one">
            <img className="job-card-image" src={props.Image} alt="pic" />
          </Col>
          <Col>
            <h4 className="job-card-job-title">{props.Title}</h4>
            <p className="job-card-job-company">{props.Company}</p>
            <p className="job-card-job-location">{props.Location}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JobCard;

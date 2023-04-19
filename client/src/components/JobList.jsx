//Module Imports
import { Container, Row, Col } from "react-bootstrap";

//Styling
import "../App.css";

let JobCard = (props) => {

  return (
    <>
      <Container className="job-card-container" onClick={() => props.onClick(props.index, props.item)}>
        <Row>
          <Col  lg={1} className="job-card-col-one">
            <img className="job-card-image" src={props.Image} alt="pic" />
          </Col>
          <Col>
            <h4 className="job-card-job-title">{props.item.Title}</h4>
            <p className="job-card-job-company">{props.Company}</p>
            <p className="job-card-job-location">{props.Location}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JobCard;

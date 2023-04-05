//Module Imports
import { Container, Row, Col } from "react-bootstrap";


let JobCard = (props) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <img src={props.Image} alt="pic" />
          </Col>
          <Col>
            <h3>{props.Title}</h3>
            <h4>{props.Company}</h4>
            <h4>{props.Location}</h4>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JobCard;

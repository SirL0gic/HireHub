//Module Imports
import { Container, Row, Col } from 'react-bootstrap';

//Styling
import './App.css';



function App() {
  return (
   <Container fluid className='main-container'>
    <Row className='row-one'>
      <Col className='title-col'>
        <h1 className='title'>HireHub</h1>
      </Col>
    </Row>
    <Row className='row-two'>
      <Col className='col-one' sm={1} md={4} lg={1}>
        <div className='navigation'>
          <button>News Feed</button>
          <button>Upload CV icon</button>
        </div>

      </Col>
      <Col className='col-two' sm={4} md={4} lg={4}>

      </Col>
      <Col className='col-three' sm={7} md={4} lg={7}>

      </Col>
    </Row>
   </Container>
  )
};

export default App;

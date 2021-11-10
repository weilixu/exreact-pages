import logo from './logo.svg';
import './App.css';

import {Component} from 'react'
import {Row, Col} from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

class App extends Component {

  constructor(props){
    super(props)
    //this.state = {
    //  selectedSample:'',
    //  selectedSampleUrl: ''
    //}
  }

  //
  render(){
    return (
      <Container>
        <div className = "container">
          <Jumbotron>
            <h1 className='mb-3'>Placeholder data name</h1>
            <form>
              <Row className = 'align-items-center mb-3'>
                <Col md={6}>
                  <h1>Place holder for first dataset</h1>
                </Col>
                <Col md={6}>
                  <h1>Place holder for second dataset</h1>
                </Col>
              </Row>
            </form>
          </Jumbotron>
        </div>
      </Container>
    );
  }
}


export default App;

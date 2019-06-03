import React, {Component} from 'react';
import {omsUrl} from './getOmsOfferData';
import { Badge, Row, Col } from 'reactstrap';

class OfferList extends Component {
    state = {
      offers: []
    }
    
    componentDidMount() {
      let url = `${omsUrl}`;
      
      fetch(url)
      .then(data => data.json())
      .then(data => {
        this.setState({
          offers: data.Table
        })
      })
      .catch(err => {
        console.log('======failure=======');
        console.log(err);
      });
      
        
    }
    
      render() {
        
        let offerData = this.state.offers.map((offer, index) => {
          return(
            <Col xs="6" sm="4" className="offer text-center" key={offer.pKey}>
              <img src={offer.FPMain1_URL_PNG} alt={offer.Alt_Text} style={{width: '250px', height: '250px'}}/>
              <h4>{offer.Mainline1}</h4>
              <p>{offer.Overline1}</p>
              <p>{offer.Price}</p>
              <span className="d-block pb-2 mb-0 h6 text-uppercase text-info font-weight-bold">
                Bug
                <Badge pill color="success" className="text-uppercase px-2 py-1 ml-3 mb-1 align-middle" style={{ fontSize: '0.75rem' }}>New</Badge>
              </span>
            </Col>
          )
        })
    
        return (
          <Row className="content">
            {offerData}
          </Row>
        );
      }
    }
    
    export default OfferList;
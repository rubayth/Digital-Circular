import React, {Component} from 'react';
import { Badge, Row, Col } from 'reactstrap';

class OfferList extends Component {
      render() {
        
        let offersData = this.props.offerData.map((offer, index) => {
          return(
            <Col xs="6" sm="4" className="offer text-center" key={offer.pKey}>
              <img src={offer.FPMain1_URL_PNG} alt={offer.Alt_Text} style={{width: '150px', height: '200px'}}/>
              <p className="promo__overline">{offer.Overline1}</p>
              <h5 className="font-weight-bold">{offer.Mainline1}</h5>
              <span className="promo_price">{offer.Price}</span>
              <span className="d-block pb-2 mb-0 h6 text-uppercase text-info font-weight-bold">
                Bug
                <Badge pill color="success" className="text-uppercase px-2 py-1 ml-3 mb-1 align-middle" style={{ fontSize: '0.75rem' }}>New</Badge>
              </span>
            </Col>
          )
        })
    
        return (
          <Row className="content">
            {offersData}
          </Row>
        );
      }
    }
    
    export default OfferList;
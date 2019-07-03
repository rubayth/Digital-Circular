import React, {Component} from 'react';
import { Badge, Row, Col, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';

class OfferList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalTitle:"",
      modalDescription:"",
      modalImg:"",
      modalPrice:"",
      modalOverline:"",
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(offer) {
    const { Mainline1 ,Overline1, Price, FPMain1_URL_PNG, Alt_Text}  = offer;
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalTitle: Mainline1, 
      modalDescription: Alt_Text,
      modalImg: FPMain1_URL_PNG,
      modalPrice: Price,
      modalOverline: Overline1
    }));
  }
  
  renderOffers() {
        
        let offersData = this.props.offerData.map((offer, index) => {
          //Just a freaking hack for the images to show...we need to fix.
          if (offer.FPMain1_URL_PNG !== null) {
            var imageName = offer.FPMain1_URL_PNG.substring(offer.FPMain1_URL_PNG.lastIndexOf('/') + 1);
          }
          else {
            return false;
          }
          return(
            <Col onClick={()=>this.toggle(offer)} xs="6" sm="4" className="offer text-center" key={offer.pKey}>
              <img src={`https://s3.wasabisys.com/hugo-images/2019/05/${imageName}`} alt={offer.Alt_Text} className="offer-image" />
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
        return offersData;
      }

      renderModal(){
        return(
          <Modal isOpen={this.state.modal} className={this.props.className} size='lg'>
              <ModalHeader toggle={this.toggle} className='pb-0'></ModalHeader>
                <ModalBody>
                <Container>
                <Row>
                  <Col className="promoModal__img-col" xs="6">
                    <div className="promo__img--wrap mb-3">
                      <img src={this.state.modalImg} alt={this.state.modalDescription} className="img-fluid d-block" />
                    </div>
                  </Col>
                  <Col className="promoModal__text-col" xs="6">
                    <div className="promo__text--wrap">
                      <h5 className="promo__title">
                        <span className="promo__overline">{this.state.modalOverline}</span>
                        <span className="promo__mainline">{this.state.modalTitle}</span>
                      </h5>
                      <div className="promo__price--wrap">
                        <span className="promo__price">{this.state.modalPrice}</span>
                      </div>
                      <div className="promo__description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sapien nibh, lacinia feugiat sapien quis, maximus cursus augue.</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
                </ModalBody>
                
          </Modal>
        )
      }
    
      render() {
        return (
          <Row className="content">
            {this.renderOffers()}
            {this.renderModal()}
          </Row>
        );
      }
    }
    
    export default OfferList;
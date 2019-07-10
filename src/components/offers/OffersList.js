import React, {Component} from 'react';
import {Row, Col, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';
import Category from './Category';
import _ from 'lodash';

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
    }
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
  
  renderCategories(){
    if (this.props.filteredCategories.length > 0) {
      return _.map(this.props.filteredCategories, (category) => {
        return(
          <Category 
          toggle={this.toggle}
          key={category}
          category = {category}
          offerData={this.props.offerData} 
          filteredCategories={this.props.filteredCategories} 
          offerCategories={this.props.offerCategories}
          />
        )
    })}
    return _.map(this.props.offerCategories, (category) => {
      return(
        <Category 
        toggle={this.toggle}
        key={category}
        category = {category}
        offerData={this.props.offerData} 
        filteredCategories={this.props.filteredCategories} 
        offerCategories={this.props.offerCategories}
        />
      )
    })
  }

  render() {
    return (
      <section id="tier3-promos" className="tierX tier3 container pb-4">
        {this.renderCategories()}
        {this.renderModal()}
      </section>
    );
  }
}
    
export default OfferList;
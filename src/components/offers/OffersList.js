import React, {Component} from 'react';
import {Row, Col, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';
import Category from './Category';
import PromotionalOffers from './PromotionalOffers';
import { connect } from 'react-redux';
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
    const { Mainline1Web ,Overline1Web, Price, Image1URL, AltText}  = offer;
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalTitle: Mainline1Web, 
      modalDescription: AltText,
      modalImg: Image1URL,
      modalPrice: Price,
      modalOverline: Overline1Web
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
        if (category !== null && category !== 'HERO1' && category !== 'HERO2' && category !== 'HERO3' && category !== 'TIER2' && category !== "Seasonal Savings" && category !== "Seasonal Savings ")
        return(
          <Category 
          toggle={this.toggle}
          key={category}
          category = {category}
          />
        )
    })}
    return _.map(this.props.offerCategories, (category) => {
      if (category !== null && category !== 'HERO1' && category !== 'HERO2' && category !== 'HERO3' && category !== 'TIER2' && category !== "Seasonal Savings" && category !== "Seasonal Savings ")
      return(
        <Category 
        toggle={this.toggle}
        key={category}
        category = {category}
        />
      )
      
    })
  }

  render() {
    return (
      <div>
        <PromotionalOffers toggle={this.toggle}/>
        <section className="tierX tier3 container pb-4">
          {this.renderCategories()}
          {this.renderModal()}
        </section>
      </div>
    );
  }
}
    
function mapStateToProps({ currentOffers, categories, filters }) {
  return { 
    offerData: currentOffers,
    offerCategories: categories,
    filteredCategories: filters
  };
}

export default connect(mapStateToProps)(OfferList);
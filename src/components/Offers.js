import React, {Component} from 'react';
import {Row, Col, Modal, ModalHeader, ModalBody, Container } from 'reactstrap';
import _ from 'lodash';
import Slider from "react-slick";

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
      categoryImages: {
        Grocery: "grocery",
        Meat: "Hugos_dc_dept_meat",
        Produce: "produce",
        Seafood: "seafood",
        Deli: "deli",
        Bakery: "bakery",
        Dairy: "dairy",
        Frozen: "frozen-foods",
        "Home & Family": "health-personal-care",
        Floral: "floral",
        "Naturally Hugo's" : "natural-208x300",
        "Wine & Spirits": "wine_spirits-208x300",
        "Wine & Spirits ": "wine_spirits-208x300",
      },
      sliderSettings: {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 4,
        initialSlide: 0,
      }
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
  
  getOffers(category) { //render offers, checks if it belongs to specific category, not really efficent
    console.log(this.props.offerData)
    const offer = _.map(this.props.offerData, (offer) => {
      //Just a freaking hack for the images to show...we need to fix.
      if (offer.FPMain1_URL_PNG !== null) {
        var imageName = offer.FPMain1_URL_PNG.substring(offer.FPMain1_URL_PNG.lastIndexOf('/') + 1);
      }
      else {
        return false;
      }
      if(offer.Category === category){
        return (
          <div onClick={()=>this.toggle(offer)} className="promo__inner slide__inner" key={offer.pKey}>
            <div className="promo__img">
              <img src={`https://s3.wasabisys.com/hugo-images/2019/05/${imageName}`} alt={offer.Alt_Text} className="img-fluid d-block" />
            </div>

            <div className="promo__text--wrap">
              <h5 className="promo__title">
                  <span className="promo__overline">{offer.Overline1}</span>
                  <span className="promo__mainline">{offer.Mainline1}</span>
              </h5>
              <div className="promo__price--wrap">
                <span className="promo__price">{offer.Price}</span>
              </div>      
            </div>
            
            <button type="button" className="btn btn-primary btn-plus fg-white">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        )
      }
    })
    return offer;
  }
  renderCategories(categoryList){ // render each category, also calls getOffers method for each category
    return _.map(categoryList, (category) => {
      console.log(category);
      return(
        <div className="tierX-row tier3-row row" key={category}>
          <div className="tierX__cover tier3__cover col-12 col-md-3">
            <h3 className="d-md-none text-center py-3 my-4">Placeholder</h3>
            <img src={`https://s3.wasabisys.com/hugo-images/2019/05/${this.state.categoryImages[category]}.jpg`} alt="" className="d-none d-md-block" />
          </div>
          <div className="tierX-slider__wrap tier3-slider__wrap col-12 col-md-9">
            <Slider {...this.state.sliderSettings}>
              {this.getOffers(category)}
            </Slider>
          </div>
        </div>
        )
      })
  }
  renderRow() {
    //check for filters
    if (this.props.filteredCategories.length > 0) {
      return this.renderCategories(this.props.filteredCategories);
    }
    return this.renderCategories(this.props.offerCategories);
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
      <section id="tier3-promos" className="tierX tier3 container pb-4">
        {this.renderRow()}
        {this.renderModal()}
      </section>
    );
  }
}
    
export default OfferList;
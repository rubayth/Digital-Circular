import React, {Component} from 'react';
import {Row, Col, Modal, ModalHeader, ModalBody, Container, Spinner } from 'reactstrap';
import Category from './Category';
import PromotionalOffers from './PromotionalOffers';
import SearchResult from './SearchResult';
import HeroSlider from '../HeroSlider';
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
    const { Mainline1Web ,Overline1Web, Price, Image1URL, AltText, Description }  = offer;
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalTitle: Mainline1Web, 
      modalAlt: AltText,
      modalImg: Image1URL,
      modalPrice: Price,
      modalOverline: Overline1Web,
      modalDescription: Description
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
                  <img src={this.state.modalImg} alt={this.state.modalAlt} className="img-fluid d-block" />
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
                    {this.state.modalDescription
                    ? <p>{this.state.modalDescription}</p>
                    : <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sapien nibh, lacinia feugiat sapien quis, maximus cursus augue.</p>
                    }
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
    const filtersWithoutBugs =_.filter(this.props.filteredCategories, filter => !(_.includes(this.props.omsData.Bugs, filter)));
    if (filtersWithoutBugs.length > 0) {
      return _.map(filtersWithoutBugs, (category) => {
        return _.map(this.props.omsData['Tier3 Cover'], (categoryOffer) => {
          if( categoryOffer.Category === category){
            const banner = _.find(this.props.omsData.Banner, {'Category': categoryOffer.Category});
            return(
              <Category 
              toggle={this.toggle}
              key={categoryOffer.Category}
              categoryOffer = {categoryOffer}
              banner={banner || false}
            />
            )
          }
        })
    })}
    return _.map(this.props.omsData['Tier3 Cover'], (categoryOffer) => {
      const banner = _.find(this.props.omsData.Banner, {'Category': categoryOffer.Category});
      return(
        <Category 
        toggle={this.toggle}
        key={categoryOffer.Category}
        categoryOffer = {categoryOffer}
        banner={banner || false}
        />
      )
    })
  }

  isPending(){
    return(
      <section id="hero" className="hero container-fluid">
        <div className="col-12 mt-5 pb-5 text-center">
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      </section>
    )
  }

  noOffers(){
    return(
      <section id="hero" className="hero container-fluid">
        <div className="col-12 mt-5 pb-5 text-center">
            <h3 className="fg-gray-1d">There are no offers available this week.</h3>
        </div>
      </section>
    )
  }
  render() {
    return (
      <div>
        { this.props.omsData === false || this.props.offerData === false
          ? this.isPending()
          : _.isEmpty(this.props.omsData.Product)//no offers to display
            ? this.noOffers()
            : this.props.searchQuery 
              ? <SearchResult toggle={this.toggle}/>
              : (
                this.props.filteredCategories.length > 0
                  ? <section className="tierX tier3 container pb-4">
                      {this.renderCategories()}
                    </section>
                  : <div>
                      <HeroSlider />
                      <PromotionalOffers toggle={this.toggle}/>
                        <section className="tierX tier3 container pb-4">
                          {this.renderCategories()}
                        </section>
                    </div>
                )
          }
          {this.renderModal()}
      </div>
    );
  }
}
    
function mapStateToProps({ currentOffers, omsData, categories, filters, searchQuery, allOffers}) {
  return { 
    offerData: currentOffers,
    offerCategories: categories,
    filteredCategories: filters,
    searchQuery,
    omsData,
    allOffers
  };
}

export default connect(mapStateToProps)(OfferList);
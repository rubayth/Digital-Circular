import React, {Component} from 'react';
import Slider from 'react-slick';
import Item from './Item';
import _ from 'lodash';
import { connect } from 'react-redux';

class PromotionalOffers extends Component { 
  constructor(props){
      super(props);
      this.state = {
          sliderSettings: {
              dots: true,
              infinite: false,
              speed: 500,
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 0,
          }
      };
  }

  getPromotionalOffers(tier2num) {
    const offer = _.map(this.props.allOffers, (offer) => {
        //Just a freaking hack for the images to show...we need to fix.
        if (offer.Image1URL !== null) {
          var imageName = offer.Image1URL.substring(offer.Image1URL.lastIndexOf('/') + 1);
        }
        if(offer.Tier2 === tier2num && offer.PromoType === "Product"){
          return (
            <Item toggle={this.props.toggle} imageName={imageName} offer={offer} key={offer.ProductKey}/>
          )
        }
    })
    return offer;
  }

  renderTier2(){
    const tier2 = _.map(this.props.omsData["Tier2 Cover"], tier2Offer => {
      return(
        <div className="tierX-row tier2-row row mt-3 mt-md-0">
          <div className="tierX__cover tier2__cover col-12 col-md-6 mb-2 mb-md-0">
              <img src={tier2Offer.Image1URL} alt="" className="d-block img-fluid"></img>
          </div>

          <div className="tierX-slider__wrap tier2-slider__wrap col-12 col-md-6 mt-2 mt-md-0">
              <Slider {...this.state.sliderSettings}>
                  {this.getPromotionalOffers(tier2Offer.Tier2)}
              </Slider>
          </div>
        </div>
        )
      })
      return tier2
  }

  render() {
    return (
    <section id="tier2-promos" className="tierX tier2 container">
      {this.renderTier2()}
    </section> 
    )
  }
}

function mapStateToProps({ omsData, allOffers }) {
    return { 
      omsData, 
      allOffers
    };
}

export default connect(mapStateToProps)(PromotionalOffers);
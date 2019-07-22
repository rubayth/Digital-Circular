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

    getPromotionalOffersTierOne() { 
        const offer = _.map(this.props.offerData, (offer) => {
            console.log(offer);
          //Just a freaking hack for the images to show...we need to fix.
          if (offer.Image1URL !== null) {
            var imageName = offer.Image1URL.substring(offer.Image1URL.lastIndexOf('/') + 1);
          }
  
          if(offer.Tier2 === "1"){
            return (
              <Item toggle={this.props.toggle} imageName={imageName} offer={offer} key={offer.ProductKey}/>
            )
          }
        })
        return offer;
        
      }

      getPromotionalOffersTierTwo() { 
        const offer = _.map(this.props.offerData, (offer) => {
            console.log(offer);
          //Just a freaking hack for the images to show...we need to fix.
          if (offer.Image1URL !== null) {
            var imageName = offer.Image1URL.substring(offer.Image1URL.lastIndexOf('/') + 1);
          }
  
          if(offer.Tier2 === "2"){
            return (
              <Item toggle={this.props.toggle} imageName={imageName} offer={offer} key={offer.ProductKey}/>
            )
          }
        })
        return offer;
        
      }

   render() {
       return (
        <section id="tier2-promos" className="tierX tier2 container">
            <div className="tierX-row tier2-row row mt-3 mt-md-0">
                <div className="tierX__cover tier2__cover col-12 col-md-6 mb-2 mb-md-0">
                    <img src="https://s3.wasabisys.com/hugo-images/2019/05/hugos_promo_generic_03.jpg" alt="" className="d-block img-fluid"></img>
                </div>

                <div className="tierX-slider__wrap tier2-slider__wrap col-12 col-md-6 mt-2 mt-md-0">
                    <Slider {...this.state.sliderSettings}>
                        {this.getPromotionalOffersTierOne()}
                    </Slider>
                </div>
            </div>
            <div className="tierX-row tier2-row row mt-3 mt-md-0">
                <div className="tierX__cover tier2__cover col-12 col-md-6 mb-2 mb-md-0">
                    <img src="https://s3.wasabisys.com/hugo-images/2019/05/hugos_promo_02.jpg" alt="" className="d-block img-fluid"></img>
                </div>

                <div className="tierX-slider__wrap tier2-slider__wrap col-12 col-md-6 mt-2 mt-md-0">
                    <Slider {...this.state.sliderSettings}>
                        {this.getPromotionalOffersTierTwo()}
                    </Slider>
                </div>
            </div>
        </section>
           
       )
   }

}
function mapStateToProps({ currentOffers }) {
    return { offerData: currentOffers };
}

export default connect(mapStateToProps)(PromotionalOffers);
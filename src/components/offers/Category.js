import React from 'react';
import Slider from 'react-slick';
import _ from 'lodash';
import { connect } from 'react-redux';
import Item from './Item';
import BannerItem from './BannerItem';

class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sliderSettings: {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 4,
                initialSlide: 0,
            }
        };
    }

  insertBanner(category){
    const products = this.props.offerData[category].slice();
    if(this.props.banner){
      products.splice((this.props.banner.Tier3Order - 1), 0, this.props.banner)
    }
    return products;
  }
  
  getOffers(category) {
    if(this.props.banner){
      const products = this.insertBanner(category);
      const offers = _.map(products, (offer) => {
        //Just a freaking hack for the images to show...we need to fix.
        if (offer.Image1URL !== null) {
          var imageName = offer.Image1URL.substring(offer.Image1URL.lastIndexOf('/') + 1);
        }
        if (offer.PromoType === "Banner"){
          return (
            <BannerItem banner={offer} key={offer.ProductKey}/>
          )
        }
        return (
          <Item toggle={this.props.toggle} imageName={imageName} offer={offer} key={offer.ProductKey}/>
        )
      });
      return offers;
    }
    //else no banner
    const offers = _.map(this.props.offerData[category], (offer) => {
      //Just a freaking hack for the images to show...we need to fix.
      if (offer.Image1URL !== null) {
        var imageName = offer.Image1URL.substring(offer.Image1URL.lastIndexOf('/') + 1);
      }
      return (
        <Item toggle={this.props.toggle} imageName={imageName} offer={offer} key={offer.ProductKey}/>
      )
    });

    return offers;
}

    render() {
        const categoryOffer = this.props.categoryOffer;
        return(
        <div className="tierX-row tier3-row row">
            <div className="tierX__cover tier3__cover col-12 col-md-3">
                <h3 className="d-md-none text-center py-3 my-4">Placeholder</h3>
                <img src={categoryOffer.Image1URL} alt={categoryOffer.Category} className="d-none d-md-block" />
                </div>
                <div className="tierX-slider__wrap tier3-slider__wrap col-12 col-md-9">
                <Slider {...this.state.sliderSettings}>
                    {this.getOffers(categoryOffer.Category)}
                </Slider>
            </div>
        </div>
        )
    }
}

function mapStateToProps({ currentOffers }) {
  return { offerData: currentOffers };
}

export default connect(mapStateToProps)(Category);
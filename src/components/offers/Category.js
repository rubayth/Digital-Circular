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
                dots: false,
                lazyLoad:true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 3,
                initialSlide: 0,
                responsive: [
                  {
                    breakpoint: 768,
                    settings:{
                      slidesToShow: 2,
                      slidesToScroll: 2
                    }
                  }
                ]
            }
        };
    }

  insertBanner(category){
    const products = this.props.offerData[_.trimEnd(category)].slice();
    products.splice((this.props.banner.Tier3Order - 1), 0, this.props.banner)
    return products;
  }
  
  getOffers(category) {
    if(this.props.banner){
      const products = this.insertBanner(category);
      const offers = _.map(products, (offer) => {
        
        if (offer.PromoType === "Banner"){
          return (
            <div className="promo promo--banner" key={offer.ProductKey}>
              <BannerItem banner={offer} />
            </div>
            
          )
        }
        return (
          <div className="promo promo--product" key={offer.ProductKey}>
            <Item toggle={this.props.toggle} imageName={offer.Image1URL} offer={offer} />
          </div>
          
        )
      });
      return offers;
    }
    //else no banner
    const offers = _.map(this.props.offerData[category], (offer) => {
      return (
        <div className="promo promo--product" key={offer.ProductKey}>
          <Item toggle={this.props.toggle} imageName={offer.Image1URL} offer={offer}/>
        </div>
      )
    });

    return offers;
}

    render() {
        const categoryColors = {
          Bakery: "rgb(195, 95, 43)",
          Dairy: "rgb(254, 189, 25)",
          Deli: "rgb(251, 158, 37)",
          Floral: "rgb(104, 123, 57)",
          Frozen: "rgb(88, 143, 184)",
          Grocery: "rgb(125, 163, 184)",
          "Home & Family": "rgb(134, 57, 91)",
          Meat: "rgb(206, 49, 44)",
          "Naturally Organic": "rgb(36, 68, 119)",
          Produce: "rgb(104, 123, 57)",
          Seafood: "rgb(63, 145, 185)",
          "Wine & Spirits": "rgb(125, 163, 184)",
          "Seasonal Savings": "#ea6425",
          "Meat & Seafood": "rgb(206, 49, 44)",
          "Fresh Produce": "rgb(0, 92, 169)",
          "Natural & Organic": "rgb(105, 159, 77)",
          "Beer & Wine": "rgb(0, 92, 169)",
        }

        const categoryOffer = this.props.categoryOffer;
        return(
        <div className="tierX-row tier3-row row">
            <div className="tierX__cover tier3__cover col-12 col-md-3">
                <h3 className="d-md-none text-center py-3 my-4" style={{backgroundColor: categoryColors[categoryOffer.Category]}}>{categoryOffer.Category}</h3>
                <img src={categoryOffer.Image1URL} alt={categoryOffer.Category} className="d-none d-md-block" />
                </div>
                <div className="tierX-slider__wrap tier3-slider__wrap col-12 col-md-9">
                <Slider {...this.state.sliderSettings} >
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
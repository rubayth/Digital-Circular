import React from 'react';
import Slider from 'react-slick';
import { categoryImages } from './categoryImages';
import _ from 'lodash';
import Item from './Item';

class Category extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sliderSettings: {
                dots: true,
                infinite: false,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 4,
                initialSlide: 0,
            }
        };
    }

  getOffers(category) { //render offers, checks if it belongs to specific category, not really efficent
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
          <Item toggle={this.props.toggle} imageName={imageName} offer={offer}/>
        )
      }
    })
    return offer;
  }

    render() {
        const category = this.props.category;
        return(
        <div className="tierX-row tier3-row row">
            <div className="tierX__cover tier3__cover col-12 col-md-3">
                <h3 className="d-md-none text-center py-3 my-4">Placeholder</h3>
                <img src={`https://s3.wasabisys.com/hugo-images/2019/05/${categoryImages[category]}.jpg`} alt="" className="d-none d-md-block" />
                </div>
                <div className="tierX-slider__wrap tier3-slider__wrap col-12 col-md-9">
                <Slider {...this.state.sliderSettings}>
                    {this.getOffers(category)}
                </Slider>
            </div>
        </div>
        )
    }
}

export default Category;
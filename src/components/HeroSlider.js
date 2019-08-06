import React, {Component} from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
import _ from 'lodash';
class HeroSlider extends Component {

  renderImage(){
    const heroImgs = _.map(this.props.omsData.Hero, hero => {
      if(hero.Href.length > 1){
        return (
          <a href={hero.Href} key={hero.UniqueId} target="_blank" rel="noopener noreferrer" tabIndex="0"> 
            <div>
              <img src={hero.Image1URL} alt={hero.Category}  className="d-block w-100 desktop img-fluid" />
              <img src={hero.Image1MobileURL} alt={hero.Category} className="d-block w-100 mobile img-fluid"></img>
            </div>
          </a>
          )
        }
      return(
        <div key={hero}>
              <img src={hero.Image1URL} alt={hero.Category}  className="d-block w-100 desktop img-fluid" />
              <img src={hero.Image1MobileURL} alt={hero.Category} className="d-block w-100 mobile img-fluid"></img>
            </div>
      )
    })
  return heroImgs;
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <section id="hero" className="hero container-fluid">
        <Slider {...settings}>
          {this.renderImage()}
        </Slider>
      </section>
    );
  }
}

function mapStateToProps({ omsData }) {
  return { omsData };
}
export default connect(mapStateToProps)(HeroSlider);
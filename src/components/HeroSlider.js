import React, {Component} from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
import altImage from '../images/hero-slide_1140w.png';
import _ from 'lodash';
class HeroSlider extends Component {

  renderImage(){
    const heroImgs = _.map(this.props.omsData.Hero, hero => {
      return (
      <div key={hero}>
        <img src={hero.Image1URL} onError={(e)=>{e.target.onerror = null; e.target.src=altImage}} alt={hero.AltText}  className="d-block w-100 desktop img-fluid" />
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
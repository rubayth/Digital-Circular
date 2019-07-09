import React, {Component} from 'react';
import Slider from "react-slick";

class HeroSlider extends Component {

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
          <div>
            <img src="https://s3.wasabisys.com/hugo-images/2019/05/hugos_hero_d_01.jpg" alt="" className="d-block w-100 desktop img-fluid" />
          </div>
          <div>
            <img src="https://s3.wasabisys.com/hugo-images/2019/05/hugos_hero_d_02-1.jpg" alt="" className="d-block w-100 desktop img-fluid" />
          </div>
          <div>
            <img src="https://s3.wasabisys.com/hugo-images/2019/05/hugos_hero_d_03-1.jpg" alt="" className="d-block w-100 desktop img-fluid" />
          </div>
          
        </Slider>
      </section>
    );
  }
}

export default HeroSlider;
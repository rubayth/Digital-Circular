import React, { Component } from "react";
import OfferList from "./components/offers/OffersList";
import FilterContainer from "./containers/FilterContainer";
import { Container } from "reactstrap";
import Landing from "./components/Landing";

import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import UnderStripe from "./components/UnderStripe";

import axios from "axios";
import _ from "lodash";


class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  async componentDidMount() {
    const res = await axios.get("https://promo-api-dev.azurewebsites.net/api/selectp?method=kroger_get_weekly_ad_offers");

    const storeOffers = _.filter(res.data.Table, {
      EventId: parseInt(659)
    });
    //console.log(storeOffers)
    _.forEach(storeOffers, picture => {
      new Image().src = picture.Image1URL;
    });
  }

  render() {
    return (
      <>
      <UnderStripe/>
        <Container className="circular-container">
          <FilterContainer />
          {this.props.cookies.get("store") ? (
            <div>
              <OfferList />
            </div>
          ) : (
            <Landing />
          )}
        </Container>
      </>
    );
  }
}

export default withCookies(App);

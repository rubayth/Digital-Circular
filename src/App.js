import React, { Component } from "react";
import OfferList from "./components/offers/OffersList";
import FilterContainer from "./containers/FilterContainer";
import { Container } from "reactstrap";
import Landing from "./components/Landing";

import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import UnderStripe from "./components/UnderStripe";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  render() {
    return (
      <>
      <UnderStripe/>
        <Container className="circular-container">
          <FilterContainer />
          {this.props.cookies.get("store") ? (
              <OfferList />
          ) : (
            <Landing />
          )}
        </Container>
      </>
    );
  }
}

export default withCookies(App);

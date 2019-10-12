import React, { Component } from "react";
import OfferList from "./components/offers/OffersList";
import FilterContainer from "./containers/FilterContainer";
import { Container } from "reactstrap";
import Landing from "./components/Landing";

import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import Header from "./components/Header";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  render() {
    return (
      <>
      <Header />
        <main id="main" className="site-main">
          <Container className="circular-container">
            <FilterContainer />
            {this.props.cookies.get("store") ? (
                <OfferList />
            ) : (
              <Landing />
            )}
          </Container>
        </main>
      </>
    );
  }
}

export default withCookies(App);

import React, {Component} from 'react';
import OfferList from './components/offers/OffersList';
import FilterContainer from "./containers/FilterContainer";
import { Container } from 'reactstrap';
import Landing from './components/Landing'

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  render() {
    return (
      <Container className="my-5 py-5 circular-container">
        <FilterContainer/>
        {this.props.cookies.get('store')
          ? <div>
              <OfferList/>
            </div>
          : <Landing/>
        }
      </Container>
    );
  }
}


export default withCookies(App);
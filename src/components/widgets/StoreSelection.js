import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  Container
} from "reactstrap";
import { Card, CardText, CardBody, CardTitle, Form, Input } from "reactstrap";
import { storeData } from "../../actions/Stores";
import { geolocated } from "react-geolocated";
import geocodeAPI from "../../actions/geocodeAPI";
import { orderByDistance } from "geolib";
import _ from "lodash";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import * as actions from "../../actions";
import { connect } from "react-redux";

class StoreSelection extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = props;

    //check for cookies and set them is state
    this.state = {
      modal: false,
      storesSorted: false,
      origin: cookies.get("origin") || {
        lat: "",
        lng: ""
      },
      zipcode: "",
      geoLocationBtn: "Get Location",
      stores: "",
      startDate: "",
      endDate: ""
    };

    this.getGeolocation = this.getGeolocation.bind(this);
    this.handleZipCode = this.handleZipCode.bind(this);
  }

  async componentDidMount() {
    //check if a store was selected
    const { cookies, setStore } = this.props;
    const storeFromCookies = cookies.get("store");
    if (storeFromCookies) {
      setStore(storeFromCookies);
      await this.props.fetchOms(storeFromCookies);
      //find ad dates
      if (this.props.allOffers.length > 0) {
        const offerWithDate = _.find(this.props.allOffers, offer => {
          return offer.AdDate.length > 1;
        });
        //format dates
        const startDate = offerWithDate.AdDate.replace(/-/g, "/");
        const endDate = offerWithDate.EndDate.replace(/-/g, "/");
        this.setState({
          startDate,
          endDate
        });
      }
      this.sortStores(this.state.origin);
    }
  }

  async onStoreBtnClick(store) {
    //save selected store to state and set cookie
    this.props.toggleStoreModal(this.props.storeModal);
    this.props.searchOffers(""); //on store change reset search query

    this.props.setStore(store);
    this.props.cookies.set("store", store, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    });
    
    await this.props.fetchOms(store);
    if (this.props.allOffers.length > 0) {
      //find ad dates
      const offerWithDate = _.find(this.props.allOffers, offer => {
        return offer.AdDate.length > 1;
      });
      //format dates
      const startDate = offerWithDate.AdDate.replace(/-/g, "/") || "";
      const endDate = offerWithDate.EndDate.replace(/-/g, "/");
      this.setState({
        startDate,
        endDate
      });
    }
    
  }

  sortStores(origin) {
    //after user coords are found, sort stores by distance and save to state
    const points = _.map(storeData.stores, store => {
      return store.gps;
    });

    const sorted = orderByDistance(origin, points);
    const sortedStores = _.map(sorted, point => {
      return _.find(storeData.stores, store => {
        return point === store.gps;
      });
    });
    this.setState({
      stores: sortedStores,
      storesSorted: true
    });
  }

  async handleZipCode(e) {
    //set zipcode to state and set coords to cookies
    this.setState({
      zipcode: e.target.value
    });
    if (e.target.value.length === 5) {
      const data = await geocodeAPI(e.target.value);
      const origin = data.results[0].locations[0].latLng;

      const { cookies } = this.props;
      cookies.set("origin", origin, { path: "/", maxAge: 60 * 60 * 24 * 30 });
      this.setState({ origin });
      this.sortStores(origin);
    }
  }

  getGeolocation() {
    return !this.props.isGeolocationAvailable
      ? this.setState({
          geoLocationBtn: "Your browser does not support Geolocation"
        })
      : !this.props.isGeolocationEnabled
      ? this.setState({ geoLocationBtn: "Location is not enabled" })
      : this.props.coords
      ? (this.setState({ origin: this.props.coords }),
        this.sortStores(this.props.coords))
      : this.setState({ geolocationBtn: "Getting the location data&hellip" });
  }

  renderStoreCards() {
    return _.map(this.state.stores, store => {
      const { store_number, name, address } = store;
      return (
        <Col className="col-12 col-md-6 my-3 text-center" key={store_number}>
          <Card
            className={
              store_number === this.props.storeInfo.store_number
                ? "store user-store border border-teal"
                : "store"
            }
          >
            <CardBody>
              <CardTitle className="store__name">
                Store #{store_number + " " + name}
              </CardTitle>
              <CardText>
                {address.street}
                <br />
                {address.city + ", " + address.state + " " + address.zip_code}
              </CardText>
              {store_number === this.props.storeInfo.store_number ? (
                <CardText>This is your store.</CardText>
              ) : (
                <Button
                  className="btn bg-blue btn-store-select fg-white"
                  onClick={() => this.onStoreBtnClick(store)}
                >
                  Make this my store
                </Button>
              )}
            </CardBody>
          </Card>
        </Col>
      );
    });
  }

  renderChooseStore() {
    return (
      <div>
        <Col className="my-3 text-center">
          <Button onClick={this.getGeolocation}>
            {this.state.geoLocationBtn}
          </Button>
        </Col>
        <Col className="my-3 text-center">
          <p>OR</p>
        </Col>
        <Col className="my-3 text-center">
          <Form className="float-right" inline>
            <Input
              maxLength="5"
              className="mr-3"
              onChange={this.handleZipCode}
              placeholder="Zip Code"
            />
          </Form>
        </Col>
      </div>
    );
  }
  render() {
    return (
      <div className="d-none d-md-block pr-0 store-info">
        <Button
          color="blue"
          outline
          //disabled={this.props.omsData === false}
          onClick={() => this.props.toggleStoreModal(this.props.storeModal)}
        >
          <i className="map-marker fas fa-map-marker-alt"></i>
          <span className="user-store__name">
            {this.props.storeInfo.store_number
              ? `Store #${this.props.storeInfo.store_number}`
              : " No Store Selected"}
          </span>
          <span className="user-store__city d-none d-md-inline">
            {" "}
            {this.props.storeInfo.name}
          </span>
        </Button>
        <Modal
          id="storeSelectModal"
          size="lg"
          isOpen={this.props.storeModal}
          toggle={() => this.props.toggleStoreModal(this.props.storeModal)}
        >
          <ModalHeader
            className="pb-0"
            toggle={() => this.props.toggleStoreModal(this.props.storeModal)}
          >
            {this.state.storesSorted ? ( //if location is found and stores sorted
              <Row>
                <Col>Select a Store</Col>
                <Col>
                  <Form className="float-right" inline>
                    <Input
                      maxLength="5"
                      className="mr-3"
                      onChange={this.handleZipCode}
                      placeholder="Zip Code"
                      value={this.state.zipcode}
                    />
                  </Form>
                </Col>
              </Row>
            ) : (
              <div>Select a Store</div>
            )}
          </ModalHeader>
          <ModalBody className="pt-0 pb-3">
            <Container fluid>
              <Row className="justify-content-center">
                {this.state.storesSorted //if location is found and stores sorted
                  ? this.renderStoreCards()
                  : this.renderChooseStore()}
              </Row>
            </Container>
          </ModalBody>
        </Modal>
        <div className="event-dates" data-name="05212019 Local Shop - BASE">
          Prices good
          <span className="start-date"> {this.state.startDate + " "}</span>-
          <span className="end-date"> {this.state.endDate}</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ storeModal, allOffers, omsData, storeInfo }) {
  return {
    storeModal,
    allOffers,
    omsData,
    storeInfo
  };
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(
  withCookies(
    connect(
      mapStateToProps,
      actions
    )(StoreSelection)
  )
);

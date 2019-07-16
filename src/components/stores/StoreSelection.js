import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Col, Row, Container } from 'reactstrap';
import { Card, CardText, CardBody,CardTitle, Form, Input } from 'reactstrap';
import { storeData } from '../../services/Stores';
import { geolocated } from "react-geolocated";
//import Location from './Location';
import geocodeAPI from '../../services/geocodeAPI';
import { orderByDistance } from 'geolib';
import _ from 'lodash';

class StoreSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            storesSorted: false,
            origin: {
                latitude: "",
                longitude: ""
            },
            zipcode: "",
            geoLocationBtn: "Get Location",
            stores:"",
            myStore: {
                store_number:"",
                name:"",
                address:{
                    street:"",
                    city:"",
                    state:"",
                    zip:"",
                },
                startDate:"06/21",
                endDate:"07/30"
            }
        };
    
        this.toggle = this.toggle.bind(this);
        this.getGeolocation = this.getGeolocation.bind(this);
        this.handleZipCode = this.handleZipCode.bind(this);
      }
    
    componentDidMount(){
        //fetch data
        this.setState({stores: storeData.stores});
        this.checkStore();
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    
    onStoreBtnClick(store){
        const {store_number, name, address} = store;
        this.setState({
            myStore:{
                store_number,
                name,
                startDate: "06/21", 
                endDate:"07/30",
                address: {
                    street: address.street,
                    state: address.state,
                    zip: address.zip_code
                },
            }
        });
        this.toggle();
    }

    checkStore(){
        if (this.state.myStore.store_number){
            return
        }
        this.toggle();
    }

    sortStores(){
        
        const points = _.map(this.state.stores, (store) => {
            return store.gps;
        });
        
        const sorted = orderByDistance(this.state.origin, points);
        const sortedStores = _.map(sorted, (point) => {
            return _.find(this.state.stores, (store) => {
                return point === store.gps
            })
        });
        this.setState({ 
            stores: sortedStores,
            storesSorted: true,
         });
    }

    async handleZipCode(e){
        this.setState({
            zipcode: e.target.value
         });
        if(e.target.value.length === 5){
            const data = await geocodeAPI(e.target.value);
            this.setState({ origin:data.results[0].locations[0].latLng })
            this.sortStores();
        }
    }

    getGeolocation(){
        return !this.props.isGeolocationAvailable ? (
            this.setState({geoLocationBtn: "Your browser does not support Geolocation"})
        ) : !this.props.isGeolocationEnabled ? (
            this.setState({geoLocationBtn: "Location is not enabled"})
        ) : this.props.coords 
            ? this.setState({ geoLocationBtn: this.props.coords })
            : this.setState({ geolocationBtn: "Getting the location data&hellip"})
    }

    renderStoreCards(){
        return _.map(this.state.stores, (store) => {
            const {store_number, name, address} = store;
            return(
                <div key={store_number}>
                    <Col className="my-3 text-center">
                        <Card>
                            <CardBody>
                                <CardTitle>Store #{store_number + " " + name}</CardTitle>
                                <CardText>{address.street}</CardText>
                                <CardText>{address.city + ", " + address.state + " " + address.zip_code} </CardText>
                                <Button onClick={() => this.onStoreBtnClick(store)}>Make this my store</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
            )
        })
    }

    renderChooseStore(){
        return (
            <div>
                <Col className="my-3 text-center">
                    <Button onClick={this.getGeolocation}>{this.state.geoLocationBtn}</Button>
                </Col>
                <Col className="my-3 text-center">
                <p>OR</p>
                </Col>
                <Col className="my-3 text-center">
                    <Form className="float-right" inline>
                        <Input maxLength="5" className="mr-3" onChange={this.handleZipCode} placeholder="Zip Code" />
                    </Form>
                </Col>
            </div>
        )
    }
    render() {
        return(
            <div className="d-none d-md-block pr-0">
                <Button color="secondary " outline onClick={this.toggle}  data-toggle="modal" data-target="#storeSelectModal">
                    <i className="map-marker fas fa-map-marker-alt"></i>
                    <span className="user-store__name">
                     {this.state.myStore.store_number ? `Store #${this.state.myStore.store_number}` : " No Store Selected"}</span>
                    <span className="user-store__city d-none d-md-inline"> {this.state.myStore.name}</span>
                </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader className="pb-0" toggle={this.toggle}>
                        {this.state.storesSorted  //if location is found and stores sorted
                            ?
                            <Row>
                                <Col>
                                    Select a Store
                                </Col>
                                <Col>
                                   <Form className="float-right" inline>
                                        <Input maxLength="5" className="mr-3" onChange={this.handleZipCode} placeholder="Zip Code" value={this.state.zipcode}/>
                                    </Form>
                                </Col>
                            </Row>
                            : <div>Select a Store</div>
                        }
                            </ModalHeader>
                        <ModalBody className="pt-0 pb-3">
                            <Container fluid>
                                <Row className="justify-content-center">
                                    {this.state.storesSorted
                                    ? this.renderStoreCards()
                                    : this.renderChooseStore()
                                    }  
                                </Row>
                            </Container>
                        </ModalBody>
                    </Modal>
                <div className="event-dates" data-name="05212019 Local Shop - BASE">
                 Prices good 
                <span className="start-date"> {this.state.myStore.startDate}</span>
                -<span className="end-date"> {this.state.myStore.endDate}</span>
                </div>
            </div>
        );
    }

}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(StoreSelection);
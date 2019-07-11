import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Col, Row, Container } from 'reactstrap';
import { Card, CardText, CardBody,CardTitle } from 'reactstrap';
import { storeData } from './Stores';
import _ from 'lodash';

class StoreSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
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
                startdate:"",
                endDate:""
            }
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
    componentDidMount(){
        //fetch data
        this.setState({stores: storeData.stores})
        console.log(storeData.stores)
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
                address: {
                    street: address.street,
                    state: address.state,
                    zip: address.zip_code
                },
            }
        });
        this.toggle();
    }
    renderStoreCards(){

        return _.map(this.state.stores, (store) => {
            const {store_number, name, address} = store;
            return(
                <div>
                    <Col className=" my-3 text-center">
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
    render() {
        return(
            <div className="d-none d-md-block pr-0">
                <Button color="secondary " outline onClick={this.toggle}  data-toggle="modal" data-target="#storeSelectModal">
                    <i className="map-marker fas fa-map-marker-alt"></i>
                    <span className="user-store__name">
                     {this.state.myStore.store_number ? `Store #${this.state.myStore.store_number}` : " No Store Selected"}</span>
                    <span className="user-store__city d-none d-md-inline"> {this.state.myStore.name}</span>
                </Button>
                    <Modal  isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader className="pb-0" toggle={this.toggle}>Select a Store</ModalHeader>
                        <ModalBody className="pt-0 pb-3">
                            <Container fluid>
                                <Row className="">
                                    {this.renderStoreCards()}
                                </Row>
                            </Container>
                        </ModalBody>
                    </Modal>
                <div className="event-dates" data-name="05212019 Local Shop - BASE">
                 Prices good 
                <span className="start-date"> {this.state.myStore.startdate}</span>
                -<span className="end-date"> {this.state.myStore.endDate}</span>
                </div>
            </div>
        );
    }

}

export default StoreSelection;
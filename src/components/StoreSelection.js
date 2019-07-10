import React, {Component} from 'react';
import {Button} from 'reactstrap';

class StoreSelection extends Component {
    
    render() {
        return(
            <div className="col-md-3 d-none d-md-block pr-0">
                <div className="user-store" data-id="11">
                    <Button className="user-store__btn" data-toggle="modal" data-target="#storeSelectModal">
                        <i className="map-marker fas fa-map-marker-alt"></i>
                        <span className="user-store__name">Placeholder Store #2</span>
                        <span className="user-store__city d-none d-md-inline">Placeholder Grand Forks</span>
                    </Button>
                </div>
                <div className="event-dates" data-name="05212019 Local Shop - BASE">
                Placeholder Prices good
                <span className="start-date">06/21</span>-<span className="end-date">Placeholder 07/30/2019</span>
                </div>
            </div>
        );
    }

}

export default StoreSelection;
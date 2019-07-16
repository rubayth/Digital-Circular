import React from "react";
import { geolocated } from "react-geolocated";
 
const Demo = () => {
        return this.props.isGeolocationAvailable ? (
            "Your browser does not support Geolocation"
        ) : !this.props.isGeolocationEnabled ? (
            "Location is not enabled"
        ) : this.props.coords 
            ? this.props.coords
            : "Getting the location data&hellip"
    }

 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Demo);
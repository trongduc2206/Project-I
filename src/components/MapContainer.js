import React from "react";
import {Map, GoogleApiWrapper} from 'google-maps-react';

export function MapContainer(props) {
    return (
        <div>
            <h1>demo</h1>
            <div>
                <Map
                    google={props.google}
                    zoom={16}
                    style={mapStyles}
                    initialCenter={{lat: 21.005492, lng: 105.844257}}
                />
            </div>
        </div>

    );
}
const mapStyles = {
    width: '100%',
    height: '100%',
};
export default GoogleApiWrapper({
    apiKey: "AIzaSyBEY6kAxIIC4bNynlyy-3H2FMpcvD0uP0Y"
})(MapContainer);


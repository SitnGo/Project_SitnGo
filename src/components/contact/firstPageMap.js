import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup} from "react-leaflet";
export default class Lapp extends Component {
    constructor(props){
        super(props);
        this.state = {
            lat: 40.198834,
            lng: 44.490723,
            zoom: 17,
        };
        this.saveMap = map => {
            this.map = map;
        };
    }
    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map center={position} zoom={this.state.zoom} ref={this.saveMap} >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker map={this.map} position={position}>
                    <Popup>
                        That's why I'm black man?
                    </Popup>
                </Marker>
            </Map>
        );
    }
};

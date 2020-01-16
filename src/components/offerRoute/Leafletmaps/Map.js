import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, } from "react-leaflet";
import Routing from "./RoutingMachine";
import LocateControl from './LocateControl';


const center = [40.179188, 44.499104]

export default class LeafletMap extends Component {
  state = {
    lat: 40.793411,
    lng: 43.839279,
    zoom: 23,
    isMapInit: false
  };
  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };
  
  handleClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log(lat, lng);
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    const locateOptions = {
        position: 'topright',
        strings: {
            title: 'Show me where I am!'
        },
        onActivate: () => {} 
    }
    
    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap} onclick={this.handleClick}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.state.isMapInit && <Routing map={this.map} />}
        <LocateControl options={locateOptions} startDirectly/>
        <Marker position={center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
      </Map>
    );
  }
}
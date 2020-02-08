import React, { Component } from "react";
import { Map, TileLayer, Marker} from "react-leaflet";
import Routing from "./RoutingMachine";
import LocateControl from './LocateControl';

export let test;

export default class LeafletMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            lat: 40.793411,
            lng: 43.839279,
            zoom: 16,
            isMapInit: false,
            isRout: true,
            hasMarker: false,
        };
        this.saveMap = map => {
            this.map = map;
            this.setState({
                isMapInit: true,
            });
        };

        test=this.map;
    }
    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map center={position} zoom={this.state.zoom} ref={this.saveMap} >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {
                    this.hasMarker &&
                    <Marker map={this.map} position={position}/>
                }
                {
                    // this.isRout &&
                    this.state.isMapInit &&
                    <Routing
                    setboolean={this.props.setboolean}
                        setDefaultPrice={this.props.setDefaultPrice}
                        setFrom={this.props.setFrom}
                        setTo={this.props.setTo}
                        setIsRouteSuccess={this.props.setIsRouteSuccess}
                        setPrice = {this.props.setPrice}
                        setIsRouteError={this.props.setIsRouteError}
                        map={this.map}
                    />
                }
                <LocateControl options={this.locateOptions} startDirectly/>
            </Map>
        );
    }
};

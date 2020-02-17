import React, { Component } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

(function() {
	var L = require('leaflet');

	L.Routing = L.Routing || {};

	L.Routing.routeToGeoJson = function(route) {
        // console.log(route)
		var wpNames = [],
			wpCoordinates = [],
			i,
			wp,
			latLng;

		for (i = 0; i < route.waypoints.length; i++) {
			wp = route.waypoints[i];
			latLng = L.latLng(wp.latLng);
			wpNames.push(wp.name);
			wpCoordinates.push([latLng.lng, latLng.lat]);
		}

		return {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {
						id: 'waypoints',
						names: wpNames
					},
					geometry: {
						type: 'MultiPoint',
						coordinates: wpCoordinates
					}
				},
				{
					type: 'Feature',
					properties: {
						id: 'line',
					},
					geometry: L.Routing.routeToLineString(route)
				}
			]
		};
	};

	L.Routing.routeToLineString = function(route) {
		var lineCoordinates = [],
			i,
			latLng;

		for (i = 0; i < route.coordinates.length; i++) {
			latLng = L.latLng(route.coordinates[i]);
			lineCoordinates.push([latLng.lng, latLng.lat]);
		}

		return {
			type: 'LineString',
			coordinates: lineCoordinates
		};
	};

})();





export default class LeafletMap extends Component {
  state = {
    lat: 40.1860413, 
    lng: 44.51837,
    zoom: 9,
    isMapInit: false
  };
  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };
	getStyle(feature, layer) {
    return {
      color: '#006400',
      weight: 5,
      opacity: 0.65
    }
  }
  getGeoJson(data) {
    return data;
    }

  render() {
    
	let Routegeojson = L.Routing.routeToGeoJson(this.props.route.route.route)
	// console.log(this.props.route.route.waypoints[0].latLng.lat, this.props.route.route.waypoints[0].latLng.lng)
   
    const position = [this.props.route.route.waypoints[0].latLng.lat, this.props.route.route.waypoints[0].latLng.lng];
    return (
      <Map route = {this.props.route} center={position} zoom={this.state.zoom} ref={this.saveMap} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      
        <GeoJSON key={Math.random()} data={this.getGeoJson(Routegeojson)} style={this.getStyle} />
      </Map>
    );
  }
}
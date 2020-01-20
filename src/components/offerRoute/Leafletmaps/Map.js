import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import Routing from "./RoutingMachine";
import LocateControl from './LocateControl';
import GeoSearch from './GeoSearch'
import L from "leaflet"


const center = [40.179188, 44.499104]

export default class LeafletMap extends Component {
  state = {
    lat: 40.793411,
    lng: 43.839279,
    zoom: 16,
    isMapInit: false
  };
  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true,
    });
    
    
  };
  

  handleClick = (e) => {
    const { lat, lng } = e.latlng;
    //let a = LocateControl.getPosition();
    //console.log(lat, lng);
    //console.log(a)
  };

  // render() {
  //   const position = [this.state.lat, this.state.lng];
  //   const locateOptions = {
  //       position: 'topright',
  //       strings: {
  //           title: 'Show me where I am!'
  //       },
  //       onActivate: () => {} 
  //   }
  // }

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

    let position1 = new L.Marker([40.793411, 43.839279])
    let geoJSON1 = position1.toGeoJSON();
    console.log(geoJSON1)
    
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.state.isMapInit && <Routing map={this.map}/>}
       <LocateControl options={this.locateOptions} startDirectly/>
        {/* <GeoJSON data={this.getGeoJson(geoJSON1)} style={this.getStyle} /> */}
      </Map>
    );
  }
}




// export default class LeafletMap extends Component {
//  constructor(){
//    super();
//    this.state = {
//     lat: 40.793411,
//     lng: 43.839279,
//     zoom: 13,
//     isMapInit: false
//   };
//  }

//   saveMap = map => {
//     this.map = map;
//     this.setState({
//       isMapInit: true
//     });
//   };
  
//   handleClick = (e) => {
//     const { lat, lng } = e.latlng;
//     console.log(lat, lng);
//   };
//   markerClick(e){
//     console.log(e.target.value)
//   }
//   render() {
//     let position = new L.Marker([40.793411,43.839279 ])
//     let geoJSON1 = position.toGeoJSON();
//     console.log(geoJSON1)
//     let position1 = [this.state.lat, this.state.lng];
//     const locateOptions = {
//         position: 'topright',
//         strings: {
//             title: 'Show me where I am!'
//         },
//         onActivate: () => {} 
//     }
//     /////////////////////////////////////////////////////////////////////////////

    
//     //////////////////////////////////////////////////////////////////////////////
//     return (
//       <Map center={position1}  zoom={this.state.zoom} ref={this.saveMap} onclick={this.handleClick}>
//         <TileLayer
//           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//         />
//         {this.state.isMapInit && <Routing map={this.map} />}
//         <LocateControl options={locateOptions} startDirectly/>
//         <Marker >
//               <Popup>
//                 A pretty CSS3 popup. <br /> Easily customizable.
//               </Popup>
//             </Marker>
//             <GeoJSON data = {getGeoJson()}/>
//       </Map>
//     );
//   }
// }

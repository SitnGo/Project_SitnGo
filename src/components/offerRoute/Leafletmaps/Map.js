import React, { Component } from "react";
import { Map, TileLayer} from "react-leaflet";
import Routing from "./RoutingMachine";
import LocateControl from './LocateControl';

export default class LeafletMap extends Component {
  constructor (props){
      super(props);

      this.state = {
        lat: 40.793411,
        lng: 43.839279,
        zoom: 16,
        isMapInit: false,
      };
      this.saveMap = map=> {
        this.map = map;
        this.setState({
          isMapInit: true,
        });
        var asd = map;
        console.log(props)
        console.log(map)

      };
      function getStyle(feature, layer) {
        return {
            color: '#006400',
            weight: 5,
            opacity: 0.65
        }
    }
      function getGeoJson(data) {
        return data;
    }  
  }
  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} ref={this.saveMap} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.state.isMapInit && 
          <Routing 
            setDefaultPrice={this.props.setDefaultPrice} 
            setIsRouteSuccess={this.props.setIsRouteSuccess} 
            setPrice = {this.props.setPrice} 
            setIsRouteError={this.props.setIsRouteError}
            map={this.map}
          />
        }

        }
       <LocateControl 
          options={this.locateOptions} 
          startDirectly
       />
      </Map>
    ); 
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////




// export default class LeafletMap extends Component {
//   state = {
//     lat: 40.793411,
//     lng: 43.839279,
//     zoom: 16,
//     isMapInit: false
//   };
//   saveMap = map => {
//     this.map = map;
//     console.log(map)
//     this.setState({
//       isMapInit: true,
//     });
//   };
//     getStyle(feature, layer) {
//         return {
//             color: '#006400',
//             weight: 5,
//             opacity: 0.65
//         }
//     }
//     getGeoJson(data) {
//         return data;
//     }
//   render() {
//     const position = [this.state.lat, this.state.lng];
//     return (
//       <Map center={position} zoom={this.state.zoom} ref={this.saveMap} >
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//         />
//         {this.state.isMapInit && 
//           <Routing 
//             setDefaultPrice={this.props.setDefaultPrice} 
//             setIsRouteSuccess={this.props.setIsRouteSuccess} 
//             setPrice = {this.props.setPrice} 
//             setIsRouteError={this.props.setIsRouteError}
//             map={this.map}
//           />
//         }
//        <LocateControl 
//           options={this.locateOptions} 
//           startDirectly
//        />
//       </Map>
//     );
//   }
// }

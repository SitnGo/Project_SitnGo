import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import Routing from "./RoutingMachine";
import LocateControl from './LocateControl';
import ErrorBoundary from './ErrorBoundry';
import Control from 'react-leaflet-control';
const center = [40.179188, 44.499104]

export default class LeafletMap extends Component {
  state = {
    lat: 40.793411,
    lng: 43.839279,
    zoom: 23,
    isMapInit: false,
    center: [40.179188, 44.499104],
    draggable: true,
    markerData: []
  };
  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };
  
  handleClick = (e) => {
    const { lat, lng } = e.latlng;
    //let a = LocateControl.getPosition();
    //console.log(lat, lng);
    //console.log(a)
  };

  addMarker = event => {
      const {markerData} = this.state;
      const coords = event.latlng;
      this.setState({
                       markerData: [...this.state.markerData, coords]
      })
  };

  updateMarker = event => {
      console.log(this.state.markerData);
      const latLng = event.target.getLatLng();
      const markerIndex = event.target.options.marker_index;
      this.setState(prevState =>{
          const markerData = [...prevState.markerData];
          markerData[markerIndex] = latLng;
          return {markerData:markerData};
      });
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
        {this.state.isMapInit && <ErrorBoundary><Routing map={this.map}/> </ErrorBoundary>}
        <LocateControl options={locateOptions} startDirectly/>
        {this.state.markerData.map((element, index) => (
          <Marker
            key={index}
            marker_index={index}
            position={element}
            draggable={this.state.draggable}
            onDragend={this.updateMarker}
          />
        ))}
        {/* // <Marker position={center}>
        //       <Popup>
        //         A pretty CSS3 popup. <br /> Easily customizable.
        //       </Popup>
        //     </Marker> */}
         {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
         {/* <Search/> */}
         <Control position="topleft" >
        <button 
          onClick={ () => this.setState({bounds: [40.179188, 44.499104]}) }
        >
          Reset View
        </button>
      </Control>
        </Map>
    );
  }
}


// import React, { Component } from "react";
// import { Map, TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";

// export default class MapExample extends Component {
//   state = {
//     center: {
//       lat: 40.179188,
//       lng: 44.499104,
//     },
//     isMapInit: false,
//     zoom: 4,
//     draggable: true,
//     markerData: []
//   };
//   saveMap = map => {
//         this.map = map;
//         this.setState({
//           isMapInit: true
//         });
//       };
//   handleClick = (e) => {
//     const { lat, lng } = e.latlng;
//     console.log(lat, lng);
//   };
//   addMarker = event => {
//     const { markerData } = this.state;
//     const coords = event.latlng;
//     this.setState({
//       markerData: [...this.state.markerData, coords]
//     });
//   };

//   updateMarker = event => {
//     console.log(this.state.markerData);
//     const latLng = event.target.getLatLng(); //get marker LatLng
//     const markerIndex = event.target.options.marker_index; //get marker index
//     //update
//     this.setState(prevState => {
//       const markerData = [...prevState.markerData];
//       markerData[markerIndex] = latLng;
//       return { markerData: markerData };
//     });
//   };

//   render() {
//     const locateOptions = {
//                 position: 'topright',
//                 strings: {
//                 title: 'Show me where I am!'
//                 },
//                 onActivate: () => {} 
//             };
//             const position = [this.state.lat, this.state.lng];
//     return (
//       <Map
//         center={this.state.center}
//         zoom={this.state.zoom}
//         onClick={this.addMarker}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {this.state.markerData.map((element, index) => (
//           <Marker
//             key={index}
//             marker_index={index}
//             position={element}
//             draggable={this.state.draggable}
//             onDragend={this.updateMarker}
//           />
//         ))}
//     {this.state.isMapInit && <Routing map={this.map} />}
//         <LocateControl options={locateOptions} startDirectly/>
//       </Map>
//     );
//   }
// }

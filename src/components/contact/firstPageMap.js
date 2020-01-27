// import React, { Component } from 'react';
// import L from 'leaflet';
// import Icon from 'leaflet';
// //import '../LeafletMap/map.css'
// import { Map, TileLayer,  Marker, Popup } from 'react-leaflet';
// import styles from './style';


// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

// class Lapp extends Component {
//     state = { 
//         lat: 40.198510,
//         lng: 44.490089,
//         zoom: 16,
//       }
//       render (){
//         let position = [this.state.lat, this.state.lng]
//         let position1 = L.Marker([40.198510, 44.490089])
//         return (
           
//             <Map  className = 'maps'  center={position} zoom={this.state.zoom}>
//             <TileLayer
//               attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              
//             />
//             <Marker position={position1} >
//               <Popup>
//                 A pretty CSS3 popup. <br /> Easily customizable.
//               </Popup>
//             </Marker>
//           </Map>
        
//         );
//     }
// }
// export default Lapp;


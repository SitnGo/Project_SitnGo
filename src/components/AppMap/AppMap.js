import React, {useState} from 'react';
import { YMaps, Map, ZoomControl,searchControlProvider } from 'react-yandex-maps';
import styles from './style';

const mapState = {
   center: [40.199236, 44.491040],
   zoom: 17};
  
const AppMap = () => (
  
  <YMaps>
    <div style={styles.mapContainer}>
      <Map width='100%' state={mapState} />
    </div>
  </YMaps>
);
export default AppMap;


// import React from 'react';
// import { YMaps, Map } from 'react-yandex-maps';

// const mapState = { center: [55.76, 37.64], zoom: 10 };

// class MapBasics extends React.Component {
//   state = { showMap: true };

//   toggleMap() {
//     const { showMap } = this.state;
//     this.setState({ showMap: !showMap });
//   }

//   render() {
//     const { showMap } = this.state;

//     return (
//       <YMaps>
//         <div id="map-basics">
//           {showMap &&
//             // When initializing the map, you must specify
//             // its center and the zoom factor.
//             <Map state={mapState} />}

//           {/* To destroy it, just unmount component */}
//           <button onClick={() => this.toggleMap()}>
//             {showMap ? 'Delete map' : 'Show map'}
//           </button>
//         </div>
//       </YMaps>
//     );
//   }
// }

// export default MapBasics;
import React, {useState} from 'react';
import { YMaps, Map, Placemark, GeoObject, Clusterer } from 'react-yandex-maps';
import styles from './style';
import points from "./points.json";

const mapState = {
   center: [40.199236, 44.491040],
   zoom: 17,
   behaviors: ["default", "scrollZoom"]
  };


let myGeoObject = ({
  geometry: {
      type: "Point",
      coordinates: [40.199236, 44.491040],

  }
 });

 const placemark = Placemark([40.199236, 44.491040]);

 const getPointData = index => {
  return {
    balloonContentBody: "placemark <strong>balloon " + index + "</strong>",
    clusterCaption: "placemark <strong>" + index + "</strong>"
  };
};
//const getPointOptions = () => {
//   return {
//     preset: "islands#violetIcon"
//   };
// };
  
const AppMap = () => (

  
  
  <YMaps>
    <div style={styles.mapContainer}>
      <Map width='100%' state={mapState}>
      {/* <Clusterer
            options={{
              preset: "islands#invertedVioletClusterIcons",
              groupByCoordinates: false,
              clusterDisableClickZoom: true,
              clusterHideIconOnBalloonOpen: false,
              geoObjectHideIconOnBalloonOpen: false
            }}
          > {points.map((coordinates, idx) => (
                          <Placemark
                            key={idx}
                            geometry={{ coordinates }}
                            properties={getPointData(idx)}
                            options={getPointOptions()}
                          />
                        ))}
          </Clusterer> */}
      
      </Map>
      
       
      
    </div>
  </YMaps>
);
export default AppMap;




// import React from "react";
// import ReactDOM from "react-dom";
// import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps";

// import points from "./points.json";



// const mapState = {
//   center: [40.199236, 44.491040],
//   zoom: 9,
//   behaviors: ["default", "scrollZoom"]
// };

// const getPointData = index => {
//   return {
//     balloonContentBody: "placemark <strong>balloon " + index + "</strong>",
//     clusterCaption: "placemark <strong>" + index + "</strong>"
//   };
// };

// const getPointOptions = () => {
//   return {
//     preset: "islands#violetIcon"
//   };
// };

// function AppMapp() {
//   return (
//     <div className="App">
//       <YMaps>
//         <Map state={mapState}>
//           <Clusterer
//             options={{
//               preset: "islands#invertedVioletClusterIcons",
//               groupByCoordinates: false,
//               clusterDisableClickZoom: true,
//               clusterHideIconOnBalloonOpen: false,
//               geoObjectHideIconOnBalloonOpen: false
//             }}
//           >
//             {points.map((coordinates, idx) => (
//               <Placemark
//                 key={idx}
//                 geometry={{ coordinates }}
//                 properties={getPointData(idx)}
//                 options={getPointOptions()}
//               />
//             ))}
//           </Clusterer>
//         </Map>
//       </YMaps>
//     </div>
//   );
// }

// export default AppMapp;

import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import Geocoder from 'leaflet-control-geocoder';
import fire from '../../../ConfigFirebase/Fire';




class Routing extends MapLayer {
  constructor(props){
    super(props)
    this.state={
      route: null
    }
  }
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [L.latLng(40.392899, 44.698891), L.latLng(40.179188, 44.499104)],
      routeWhileDragging: true,
      autoRoute: false,
      reverseWaypoints: true,
      showAlternatives: true,
      addWaypints: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: 'green', opacity: 1, weight: 5 }]
      },
      altLineOptions: {
          styles: [
              {color: 'black', opacity: 0.15, weight: 9},
              {color: 'white', opacity: 0.8, weight: 6},
              {color: 'blue', opacity: 0.5, weight: 2}
          ]},
          geocoder: Geocoder.nominatim()
    })
    .on('routesfound', function(e) {
      let routes = e.routes;
      let waypoints = e.waypoints;
      let route = {waypoints: waypoints}

      async function getMarker(user={}) {
        let userId;
        if (localStorage.getItem("userId")){
            userId = localStorage.getItem("userId")                
        }else{
            userId = fire.auth().currentUser.uid;
        }
        user = await fire.firestore().collection("users").doc(userId).get()
            user = user.data();
        return user;
    }
    getMarker().then(result => {
      if(!result.hasOwnProperty("userRoutes")){
        result.userRoutes = {}
      }
      result.userRoutes = JSON.parse(JSON.stringify(route));
      // fire.firestore().collection("users").doc(result.userId).set(JSON.parse(JSON.stringify(result)))
      localStorage.setItem("route",JSON.stringify(route))
    });
    getMarker().then(result => {
      console.log(result)
    });



    })
    .addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);

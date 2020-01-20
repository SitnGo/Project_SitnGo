import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import Geocoder from 'leaflet-control-geocoder';




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
    .on('routeselected', function(e) {
      let routes = e.route;
      let waypoints =e.waypoints;
      let route = {route:routes, waypoints: routes.waypoints}
      console.log(route.waypoints)
      console.log(routes)
      localStorage.setItem("selectedRoute1", JSON.stringify(routes))
      localStorage.setItem("route",JSON.stringify(route))
    })
    .addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);

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
    let leafletElement = L.Routing.control({
      waypoints: [L.latLng(40.392899, 44.698891), L.latLng(40.179188, 44.499104)],
      routeWhileDragging: true,
      autoRoute: true,
      reverseWaypoints: true,
      showAlternatives: true,
      addWaypints: true,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: 'green', opacity: 1, weight: 5 }]
      },
      altLineOptions: {
          styles: [
              {color: 'black', opacity: 0.15, weight: 9},
              {color: 'red', opacity: 0.8, weight: 6},
              {color: 'blue', opacity: 0.5, weight: 2}
          ]},
          geocoder: Geocoder.nominatim()
    })
    .on('routeselected', (e)=> {
      this.props.setIsRouteError(false);
      this.props.setIsRouteSuccess(true);
      let routes = e.route;
      let route = {route:routes, waypoints: routes.waypoints}
      localStorage.setItem("selectedRoute1", JSON.stringify(routes))
      localStorage.setItem("route",JSON.stringify(route))
      this.props.setPrice((Math.ceil(routes.summary.totalDistance/1000)*100))
      this.props.setDefaultPrice((Math.ceil(routes.summary.totalDistance/1000)*100))
      let streetNames = routes.name.split(",") 
      if(streetNames[0]) {
        this.props.setFrom(streetNames[0])
      }
      if(streetNames[1]) {
        this.props.setTo(streetNames[1])
      }
      this.props.setboolean(false)
    }).on("waypointschanged",()=>{
      this.props.setIsRouteError(false);
      this.props.setIsRouteSuccess(false);
    })
    .on("routingerror",()=>{
      this.props.setIsRouteError(true);
      this.props.setIsRouteSuccess(false);
    })
    .addTo(this.props.map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);

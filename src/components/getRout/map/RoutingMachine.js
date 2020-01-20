import { MapLayer } from "react-leaflet";
import L, { control } from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import Geocoder from 'leaflet-control-geocoder';




class Routing extends MapLayer {
  constructor(props){
    super(props)
  }
  createLeafletElement() {
    const { map } = this.props;

    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(this.props.start.lat, this.props.start.lng),
        L.latLng(this.props.finish.lat, this.props.finish.lng)
    ],
    routeWhileDragging: true,

    })
    // let leafletElement = control.setAlternatives([JSON.parse(localStorage.getItem("selectedRoute"))])
    .addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);

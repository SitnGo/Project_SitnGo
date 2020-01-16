import React from 'react';
import { render } from 'react-dom';
import Map from './Map';
import './style.css';


const MLeafletApp = props => {

    return (
      <Map zoom={16} maxZoom = {20} center={{ lat: 40.179188, lng: 44.499104 }} />
    );
}
export default MLeafletApp;
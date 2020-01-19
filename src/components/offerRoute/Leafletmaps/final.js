import React from 'react';
import { render } from 'react-dom';
import Map from './Map';
import './style.css';


const MLeafletApp = props => {

    return (
      <Map route={props.route} setRoute={props.setRoute} />
    );
}
export default MLeafletApp;
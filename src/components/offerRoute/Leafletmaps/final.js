import React from 'react';
import Map from './Map';
import './style.css';

const MLeafletApp = props => {
    return (
      <Map setMap = {props.setMap} setIsRouteSuccess={props.setIsRouteSuccess} setIsRouteError={props.setIsRouteError} />
    );
}
export default MLeafletApp;
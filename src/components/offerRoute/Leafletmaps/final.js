import React from 'react';
import Map from './Map';
import './style.css';

const MLeafletApp = props => {
    return (
      <Map setboolean={props.setboolean} setMap = {props.setMap} setDefaultPrice={props.setDefaultPrice} setPrice = {props.setPrice} setFrom = {props.setFrom} setTo = {props.setTo} setIsRouteSuccess={props.setIsRouteSuccess} setIsRouteError={props.setIsRouteError} />
    );
}
export default MLeafletApp;
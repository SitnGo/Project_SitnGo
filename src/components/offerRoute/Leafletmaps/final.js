import React from 'react';
import Map from './Map';
import './style.css';

const MLeafletApp = props => {
    return (
        <Map 
            setMap = {props.setMap} 
            setDefaultPrice={props.setDefaultPrice} 
            setPrice = {props.setPrice} 
            setIsRouteSuccess={props.setIsRouteSuccess} 
            setIsRouteError={props.setIsRouteError} 
        />
    );
}
export default MLeafletApp;
import React from 'react';
import MLeafletApp from '../offerRoute/Leafletmaps/final';
import styles from './style';

// const placemark = Placemark([40.199236, 44.491040]);

const AppMap = () => {
    const classes = styles();
    return(
        <div className = {classes.mapContainer}>
            <MLeafletApp />
        </div>
    );
}
export default AppMap;

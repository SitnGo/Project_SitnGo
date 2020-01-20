import React from 'react';
import { YMaps, Map, Placemark, GeoObject, Clusterer } from 'react-yandex-maps';
import styles from './style';

const mapState = {
    center: [40.199236, 44.491040],
    zoom: 17,
    behaviors: ['default', 'scrollZoom']
};

let myGeoObject = ({
    geometry: {
        type: 'Point',
        coordinates: [40.199236, 44.491040],
    }
});

const placemark = Placemark([40.199236, 44.491040]);

const getPointData = index => {
    return {
        balloonContentBody: 'placemark <strong>balloon ' + index + '</strong>',
        clusterCaption: 'placemark <strong>' + index + '</strong>'
    };
};

const AppMap = () => (

    <YMaps>
        <div style={styles.mapContainer}>
            <Map width='100%' state={mapState}>

            </Map>
        </div>
    </YMaps>
);
export default AppMap;

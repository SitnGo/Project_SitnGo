import React from 'react';
import { YMaps, Map, } from 'react-yandex-maps';
import styles from './style';

const mapState = { center: [40.199236, 44.491040], zoom: 17};

const AppMap = () => (
  <YMaps>
    <div style={styles.mapContainer}>
      <Map width='100%' state={mapState} />
    </div>
  </YMaps>
);
export default AppMap;
import React from 'react';
import {classes} from './style';

const ParallaxVideo = () => {
    return(
        <section style={classes.section}>
            <video style={classes.container} autoPlay muted loop>
                <source style={classes.video} src='./images/bgVideo.mp4' type='video/mp4'/>
            </video>
        </section>
    );
};

export default ParallaxVideo;
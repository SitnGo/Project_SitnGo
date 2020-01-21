import React from 'react';
import styles from './style';

const ParallaxVideo = () => {
    const classes = styles();
    return(
        <section className={classes.section}>
            <video className={classes.container} autoPlay muted loop>
                <source className={classes.video} src='./images/bgVideo.mp4' type='video/mp4'/>
            </video>
        </section>
    );
};

export default ParallaxVideo;
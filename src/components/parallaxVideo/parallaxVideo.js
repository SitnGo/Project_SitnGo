import React from 'react';

const ParallaxVideo = () => {
    const classes = {
        section: {
            height: '50vh',
        },
        container: {
            width: '100%',
            position: 'fixed',
            top: 0,
            zIndex: -1000
        },
        video: {
            width: '100%'
        }
    }

    return(
        <section style={classes.section}>
            <video style={classes.container} autoPlay muted loop>
                <source style={classes.video} src="./images/bgVideo.mp4" type="video/mp4"/>
            </video>
        </section>
    );
};

export default ParallaxVideo;
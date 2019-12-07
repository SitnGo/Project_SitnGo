import React from 'react';

const HeaderImage = () => {
    const classes = {
        section: {
            height: '100vh',
            background: 'url(./images/share.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            backgroundPositionY: '63%',
            backgroundAttachment: 'fixed'
        },
    }

    return(
        <section id="home" style={classes.section}>
        </section>
    );
};

export default HeaderImage;
import React from 'react';

const About = () => {
    const classes = {
        section: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            color: '#282e34',
            padding: '20px',
            backgroundImage: 'url("./images/about.jpg")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            position: "relative",
        },
        aboutId: {
            position: 'absolute',
            top: 0
        },
        imageCover: {
            width: '100%',
            height: '100vh',
            position: 'absolute',
            top: 0,
            backgroundColor: '#b7b3b4',
            zIndex: 1,
            opacity: 0.5
        },
        aboutHeader:{
            marginBottom: '50px',
            fontSize: '42px'
        },
        textContainer: {
            position: 'relative',
            zIndex: 2,
            width: '70%',
            margin: '0 auto',
            lineHeight: '23px',
            textAlign: 'justify',
            fontSize: '20px',
            letterSpacing: '2px'
        }
    };

    return(
        <section style={classes.section}>
            <span style={classes.aboutId} id='about'></span>
            <div style={classes.textContainer}>
                <h1 style={classes.aboutHeader}>About Us</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                    been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div style={classes.imageCover}></div>
        </section>
    );
};

export default About;
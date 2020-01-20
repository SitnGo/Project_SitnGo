import { auth } from "firebase";

export const classes = {
    section: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: '#282e34',
        padding: '40px',
        backgroundImage: 'url("./images/contact.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: "relative",
    },
    contactId: {
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
    contactHeader:{
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
    },
    contactsContainer: {
        width: '30%',
        zIndex: 100,
        color: '#000',
        fontSize: '20px',
        marginTop: '50px'
    },
    contacts: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px',
    },
    icon: {
        marginRight: '30px' 
    }
};
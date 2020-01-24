import  {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    section: {
        height: '100vh',
        color: '#282e34',
        padding: '8%',
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
        fontSize: '2em'
    },
    textContainer: {
        position: 'relative',
        zIndex: 2,
        margin: '0 auto',
        lineHeight: '23px',
        textAlign: 'justify',
        fontSize: '20px',
        letterSpacing: '2px'
    },
    contactsContainer: {
        zIndex: 100,
        color: '#000',
    },
    contacts: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px',
    },
    contactsText: {
        fontSize: '1.2em',
    },
    icon: {
        marginRight: '5%'
    },
    mapContainer: {
        height: '50vh',
    },
    '@media (max-width: 599px)': {
        contactHeader: {
            fontSize: '1.8em'
        },
        contactsText: {
            fontSize: '1em'
        }
    }
}));

export default styles;
import  {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
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
        position: 'relative',
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
}));

export default styles;
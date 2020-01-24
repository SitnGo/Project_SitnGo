import  {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    navbar: {
        height: '10vh',
        padding: '10px 20px',
        backgroundColor: '#282e34',
        position: 'relative',
        zIndex: 1000,
    },
    logo: {
        width: '100%'
    },
    menuContainer: {
        width: '72%'
    },
    signButtonsContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alineItems: 'center',
        width: '20%'
    },
    menu: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        listStyleType: 'none',
        width: '100%',
    },
    menuLink: {
        color: '#ddd'
    },
    signButton: {
        textDecoration: 'none',
    },
    sign: {
        background: '#fb9403',
        fontSize: '0.8em',
        color: '#282e34',
        '&:hover': {
            background: '#fb9403',
            opacity: 0.95,
        }
    },
    profile: {
        color: '#fb9403',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    '@media (min-width: 600px) and (max-width: 960px)': {
        logo: {
            width: '70%'
        }
    },
    '@media (max-width: 599px)': {
        sign: {
            fontSize: '0.6em'
        },
        profile: {
            fontSize: '0.6em'
        },
        menu: {
            fontSize: '0.8em'
        }
    }
}));

export default styles;
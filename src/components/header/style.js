import  {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    navbar: {
        width: '100%',
        height: '10vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#282e34',
        position: 'relative',
        zIndex: 1000,
    },
    logoContainer: {
        width: '8%'
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
        width: '60%',
    },
    menuLink: {
        color: '#ddd'
    },
    signButton: {
        textDecoration: 'none',
    },
    sign: {
        background: '#fb9403',
        fontSize: '80%',
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
    '@media (max-width: 1024px)': {
        sign: {
            fontSize: '70%',
        },
        logoContainer: {
            width: '10%'
        },
        signButtonsContainer: {
            width: '30%'
        }, 
        menuContainer: {
            width: '60%'
        },
        profile: {
            fontSize: '70%',
        }
    },
    '@media (max-width: 600px)': {
        menu: {
            fontSize: '70%'
        },
        menuContainer: {
            width: '50%'
        },
        signButtonsContainer: {
            width: '40%'
        },
        sign: {
            fontSize: '50%',
        },
        profile: {
            fontSize: '50%',
        }
    }
}));

export default styles;
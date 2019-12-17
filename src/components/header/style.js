import {makeStyles} from "@material-ui/core";

export const styles = makeStyles(() => ({
    navbar: {
        width: '100%',
        maxHeight: '10vh',
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
    headerButtonsContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alineItems: 'center',
        width: '20%'
    },
    menu: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        listStyleType: 'none'
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
    }
}));

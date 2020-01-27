import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    section:{
        width: '100%',
        height: '80vh',
        padding: '20px'
    },
    routeList: {
        width: '90%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    routeListItem: {
        margin: '0 10px'
    },
    offersContainer: {
        width: '95%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: '0 auto',
        paddingTop: '40px'
    },
    offers:{
        width: '50%',
        margin: '0 auto',
        overflow: 'auto'
    },
    offerList: {
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    offerListItem: {
        margin: '10px 0'
    },
    mapContainer: {
        width: '50%',
        height: '50vh',
        padding: '0 0 0 40px'
    },
    mapView:{
        width: '90%',
        margin: ' 0 auto',
    }, 
    accept: {
        margin: '0',
    },
    search: {
        fontSize: '0.8em'
    },
    '@media (min-width: 600px) and (max-width: 960px)': {
        resize: {
            fontSize: '0.7em'
        },
    },
    '@media (max-width: 599px)':{
        search: {
            fontSize: '0.6em'
        },
        resize: {
            fontSize: '0.6em'
        },
    }
}));

export default styles;
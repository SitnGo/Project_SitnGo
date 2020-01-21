import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    section:{
        width: '100%',
        height: '80vh',
        padding: '20px'
    },
    offer: {
        width: '90%',
        height: '100%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    rideList: {
        width: '45%',
        margin: '0  auto',
    },
    rideListItem: {
        margin: '10px',
    },
    mapContainer: {
        width: '45%',
        height: '50vh',
        margin: '0 auto',
    },
    '@media (max-width: 600px)': {
        
    }
}));

export default styles;
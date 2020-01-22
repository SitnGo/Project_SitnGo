import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    section: {
        height: '50vh',
    },
    container: {
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: -1000
    },
    video: {
        width: '100%'
    }
}));

export default styles;
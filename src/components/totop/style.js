import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    toTop: {
        position: 'fixed',
        zIndex: 1000000,
        right: '2%',
        backgroundColor: '#fb9403',
        bottom: '6.2%',
        '&:hover': {
            background: '#fb9403',
            opacity: 0.95,
        }
    }
}));

export default styles;
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    section: {
        height: '50vh',
    },
    container: {
        width: '100%',
        position: 'fixed',
        top: '0%',
        zIndex: -1000
    },
    video: {
        width: '100%'
    },
    '@media (min-width: 600px) and (max-width: 960px)': {
        container: {
            width: '200% !important'
        }
    },
    '@media (max-width: 599px)': {
        container: {
            width: '250% !important'
        }
    }
}));

export default styles;
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    root: {
        borderTop: '1px solid #282e34',
        textAlign:'center'
    },
    button: {
        margin: theme.spacing(2),
        background: '#ccc',
        fontSize: '0.8em',
        '&:hover': {
            background: '#ccc',
            opacity: 0.95,
        }
    },

    buttonChangeColor: {
        margin: theme.spacing(2),
        background: '#fb9403',
        '&:hover': {
            background: '#fb9403',
            opacity: 0.95,
        }
    }
}));

export default styles;
import {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        textAlign:'center'
    },
    button: {
        margin: theme.spacing(2),
        background: '#fb9403',
        fontSize: '0.8em',
        color: '#282e34',
        '&:hover': {
            background: '#fb9403',
            opacity: 0.95,
        }
    }
}));

export default styles;
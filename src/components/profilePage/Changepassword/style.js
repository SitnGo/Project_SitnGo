import  {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    button: {
        backgroundColor: '#fb9403',
        color: '#282e34',
        '&:hover': {
            background: '#fb9403',
            opacity: 0.95,
        }
    },
    changeButton: {
        margin: '5px',
        color: '#282e34',
    },
}));

export default styles;
import  {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textField: {
        margin: '10px'
    },
    updateCancelContainer: {
        margin: '10px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    cancelButton : {
        fontSize: '0.8em',
        color: '#282e34',
    },
    confirmButton : {
        background: '#fb9403',
        fontSize: '0.8em',
        color: '#282e34',
        '&:hover': {
            background: '#fb9403',
            opacity: 0.95,
        }
    },
    forgotButton: {
        margin: '5px',
        color: '#282e34',
    },
}));
export default useStyles;
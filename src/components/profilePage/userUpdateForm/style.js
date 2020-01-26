import  {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    textfield: {
        margin:theme.spacing(1),
        width:"50%",              
    },
    updateCancelContainer: {
        margin: '10px',
        display: 'flex',
        justifyContent: 'space-evenly',
        alineItems: 'center',
        width: '70%',
    },
    cancelButton : {
        // margin:"1% 0 0 50%",
        fontSize: '0.8em',
        color: '#282e34',
        '&:hover': {
            background: 'gray',
            opacity: 0.95,
        }
    },
    confirmButton : {
        // margin:"1% 0 0 0",
        background: '#fb9403',
        fontSize: '0.8em',
        color: '#282e34',
        '&:hover': {
            background: '#fb9403',
            opacity: 0.95,
        }

    }
}));
export default useStyles;
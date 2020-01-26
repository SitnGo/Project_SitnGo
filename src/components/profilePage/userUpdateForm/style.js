import  {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    textfield: {
        margin:theme.spacing(1),
        width:"50%",              
    },
    
    confirmButton : {
        width: "50%",
        margin:"1% 0 0 0",
        [theme.breakpoints.down('xs')] : {
            width:"46%",
        },
    },

    cancelButton: {
        width: "50%",
        margin:"1% 0 0 0",
    }
}));
export default useStyles;
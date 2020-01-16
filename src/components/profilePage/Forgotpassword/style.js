import  {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    
    confirmButton : {
        // width: "50%",
        margin:"1% 0 0 0",
        [theme.breakpoints.down('xs')] : {
            width:"46%",
        },
    },
}));
export default useStyles;
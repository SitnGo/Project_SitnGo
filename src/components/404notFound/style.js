import  {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        // backgroundColor:"red",
        height:"80vh"
    },
    text: {
        color:"#dbdbdb",
        [theme.breakpoints.down('xs')]: {
            fontSize:"4rem",
        },
    },

}));

export default useStyles;
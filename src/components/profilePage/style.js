import  {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    profileContainer: {
        height: '80vh',
        flexGrow:1,
        backgroundImage:"url('./images/share.jpg')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPositionY: '63%',
        backgroundAttachment: 'fixed',
    },
    personalInfoBlock1: {
        float:"left",
        position:"relative",
        backgroundColor:"rgba(255, 252, 252, 0.88)",
        width:"100%",
        height:"100%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
        },
    },
    bigAvatar: {
        position:"relative",
        top:"2%",
        left:"36%",   
        width:120,
        height:120,
        zIndex:222,
    },
    textfield: {
        margin:theme.spacing(1),
        width:"50%",              
    },
 
    typography: {
        margin: theme.spacing(4),
    },
    editButton: {
        position:"absolute",
        top:"2%",
        right:"4%",
    },
    hideEditButton : {
        display:"none",
    },
    input: {
        color:"#fff",
    },

    personalInfoBlock2 : {
        width:"40%",
        float:"right",
        height:"100%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
        },
    },

    confirmButton : {
        width: "50%",
        margin:"1% 0 0 25%",
        [theme.breakpoints.down('xs')] : {
            width:"46%",
        },
    },
}));
export default useStyles;
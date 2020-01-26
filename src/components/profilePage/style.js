import {makeStyles} from '@material-ui/core/styles';

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
        left:"41%",   
        width:120,
        height:120,
        zIndex:222,
    },
    textfield: {
        margin:theme.spacing(1),
        width:"50%",              
    },
 
    typography: {
       wordBreak:'break-all',
        fontSize:21,
    },
    paper: {
        display:'flex',
        margin: theme.spacing(4),
        padding:10,
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
        overflowY: "auto",
        // display:"flex",
        // flexWrap:"wrap",
        // justifyContent:"space-evenly",
        // alignItems:"center",
        width:"100%",
        // float:"right",
        // height:"100%",
        backgroundColor:"rgba(148, 148, 148, 0.45)",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
        },
    },
    cards: {
        // width:"100%",
        // overflowY: "auto",
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"space-evenly",
        alignItems:"center",
        
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
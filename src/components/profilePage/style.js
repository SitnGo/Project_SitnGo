import  {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    // header2: {
    //     backgroundImage:`url(${bg})`,
    //     width:"100%",
    //     height: 150,
    // },
    personalInfoBlock1: {
        float:"left",
        position:"relative",
        backgroundColor:"#212121",
        width:"20%",
        height:"654px",
        marginTop:"5%",
        padding:"30px",
        paddingTop:"5%",
    },
    bigAvatar: {
        position:"absolute",
        top:"11%",
        left:"4%",
        // cursor:"pointer",   
        width:120,
        height:120,
    },
    textColor: {
        color:"#fff",
        margin:theme.spacing(4),
        
    },
    editButton: {
        position:"absolute",
        top:"6%",
        right:"4%",
    },
    hideEditButton : {
        display:"none",
    },

    textField : {
        display:"flex",
        justifyContent:"center",
        alignItems:"left",
        width:"80%",
        margin:theme.spacing(3),
        '& .MuiInput-underline:before': {
            borderBottom:"2px solid #18FFFF",
        },
        '& .MuiInput-underline:after' : {
            borderBottom:"2px solid #F57F17",
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom:"2px solid #6200EA",
        }
    },
    input: {
        color:"#fff",
    },

    personalInfoBlock2 : {
        width:"50%",
        float:"right",
        marginTop:"5%",
        padding:"30px",
        height:368,
    },

    confirmButton : {
        width:"80%",
        margin:24,
    }
   
}));
export default useStyles;
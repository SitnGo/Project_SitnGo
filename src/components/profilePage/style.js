import  {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    profileContainer: {
        minHeight: '80vh',
        flexGrow:1,
    },
    leftSide: {
        height: '100%',
        padding: 10,
        backgroundColor:"rgba(255, 252, 252, 0.88)",
    },
    bigAvatar: {
        margin: '0 auto',
        width:120,
        height:120,
    },
    textfield: {
        margin:theme.spacing(1),
        width:"50%",              
    },
    editButton: {
        margin: '10px auto'
    },
    typography: {
       wordBreak:'break-all',
        fontSize:21,
    },
    paper: {
        display:'flex',
        margin: theme.spacing(3),
        padding:10,
    },
    hidden : {
        display:"none",
    },
    input: {
        color:"#fff",
    },
    avatarContainer:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 10,
    },
    personalInfoBlock2 : {
        overflowY: "auto",
        width:"100%",
        backgroundColor:"rgba(148, 148, 148, 0.45)",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
        },
    },
    cards: {
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"space-evenly",
        alignItems:"center",
    },
}));

export default styles;
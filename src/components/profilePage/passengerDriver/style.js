import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
    card: {
        maxHeight:'300px',
        width: '300px',
        margin: '5px', 
        cursor:'pointer',
        color: '#282e34',
    },
    map: {
        width: '500px',
        height: '250px',
    },
    info: {
        overflowY:'auto',
        maxHeight: '190px'
    }
}))
    
export default styles;
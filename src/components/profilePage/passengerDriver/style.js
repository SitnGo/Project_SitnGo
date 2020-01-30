import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
    card: {
        overflowY:'auto',
        maxHeight:'300px',
        width: '300px',
        margin: '5px', 
        cursor:'pointer',
    },
    map: {
        width: '500px',
        height: '250px',
    }
}))
    
export default styles;
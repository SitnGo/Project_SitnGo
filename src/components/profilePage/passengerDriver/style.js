import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
    card: {
        overflowY:'auto',
        maxHeight:'300px',
        width: '300px',
        margin: '5px', 
        cursor:'pointer',
        boxShadow: '23px 3px 14px -4px rgba(0,0,0,0.75)'
    },
    map: {
        minWidth: '500px',
        height: '250px'
    }
}))
    
export default styles;
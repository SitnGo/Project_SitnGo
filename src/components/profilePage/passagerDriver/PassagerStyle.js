import { makeStyles } from "@material-ui/core";

const styles = makeStyles(theme => ({
    card: {
        overflowY:'auto',
        maxHeight:'300px',
        width: '30%',
        margin: '5px', 
        ursor:'pointer',
        boxShadow: '23px 3px 14px -4px rgba(0,0,0,0.75)'
    }
}))
    
export default styles;
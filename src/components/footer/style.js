import  {makeStyles} from '@material-ui/core/styles';

const styles = makeStyles(theme => ({
    footer: {
        backgroundColor:'#424242',
        height: '10vh',
        padding: '30px',
        // position: 'relative',
        // zIndex: 1000,
        // bottom: 0,
    },
    socialIcons: {
        backgroundColor: '#fb9403',
        marginRight: '10px',
        color:'#282e34',
        fontSize: '30px',
        '&:hover': {
            background: '#fb9403',
            opacity: 0.95,
        }
    },

    copyrightContainer: {
        fontSize: '1em',
        color: '#ddd'
    },
    '@media (max-width: 599px)': {
        copyrightContainer: {
            fontSize: '0.9em',
        }
    }
}));

export default styles;
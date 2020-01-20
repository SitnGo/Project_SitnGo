import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme =>({
    footer: {
        backgroundColor:'#424242',
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
        height: '10vh',
        padding: '30px',
        position: 'relative',
        zIndex: 1000,
        bottom: 0,
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
    socialContainer: {
        width: '20%',
        textAlign:'center',
        [theme.breakpoints.down('xs')]: {
            width: '40%',
        },
    },
    copyrightContainer: {
        width: '30%',
        fontSize: '18px',
        color: '#ddd'
    },
    '@media (max-width: 1024px)': {
        socialContainer: {
            width: '40%',
        },
        copyrightContainer: {
            fontSize: '90%',
        }
    },
    '@media (max-width: 600px)': {
        copyrightContainer: {
            fontSize: '80%',
            marginRight: '30px',
            width: '40%',
        }
    }
}));
import  {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'url(./images/404.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        height:'80vh',
        textAlign: 'center'
    },
    text: {
        color:'#ddd',
        [theme.breakpoints.down('xs')]: {
            fontSize:'4rem',
        },
    },
    imageCover: {
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        backgroundColor: '#b7b3b4',
        zIndex: 1,
        opacity: 0.5
    },
}));

export default useStyles;
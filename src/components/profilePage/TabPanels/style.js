import  {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  
  root: {
    flexGrow: 1,
    textAlign:"center"
  },

  button: {
    margin: theme.spacing(2),
  }

}));

export default useStyles;
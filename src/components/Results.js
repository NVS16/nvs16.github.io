import React, {useState} from 'react';
import { Grid } from '@material-ui/core';import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
  ];


function Results({ results }) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    console.log(results);
    const classes = useStyles();

    const resultList = results.map((obj, i) => {
        console.log(obj)
        let prob = Math.round(obj.probability * 10000) / 100 + "%";
    return (<span><ListItem><ListItemText primary={obj.className} secondary={prob} key={i} /></ListItem> <Divider /></span>);
    });

    if (results.length !== 0) return (
        <Grid container>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        View Results
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Top 3 Predictions"}</DialogTitle>
        <DialogContent>
        <List>
          {resultList}
        </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        </Grid>
    );

    else return (<Grid container >
    <Typography color="secondary">Please select an image and hit predict!</Typography></Grid>);
}

export default Results;

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import img1 from '../images/sample_skin_cancer_images/1.jpg'
import img2 from '../images/sample_skin_cancer_images/2.jpg'
import img3 from '../images/sample_skin_cancer_images/3.jpg'
import img4 from '../images/sample_skin_cancer_images/4.jpeg'
import img5 from '../images/sample_skin_cancer_images/5.jpeg'


const reader = new FileReader();
 

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

  const tileData = [
    {
        img: img1,
        title: "Image 1",
        author: "NVS"
    }, 
    {
        img: img2,
        title: "Image 2",
        author: "NVS"
    }, 
    {
        img: img3,
        title: "Image 3",
        author: "NVS"
    }, 
    {
        img: img4,
        title: "Image 4",
        author: "NVS"
    }, 
    {
        img: img5,
        title: "Image 5",
        author: "NVS"
    }
];

function SampleImages({ setResult, setImgUrl }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // setImgUrl(tileData[0]["img"]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const classes = useStyles();
  
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Select From Sample Images
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Select one of the sample images"}</DialogTitle>
        <DialogContent>
        <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Hit predict after selecting</ListSubheader>
        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
            //   subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon} onClick={() => { setImgUrl(tile.img); setResult([]); setOpen(false); }}>
                <Button variant="contained" color="primary">
                    Select
                </Button>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}

export default SampleImages

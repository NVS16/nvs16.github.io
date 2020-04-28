import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as tf from '@tensorflow/tfjs';
import LinearProgress from '@material-ui/core/LinearProgress';

import SampleImages from './SampleImages';

import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: 'none',
  },
  progress: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ModelForm({ resultDisplay }) {
    const [fileName, setFilename] = useState(""); 
    const [file, setFile] = useState(""); 
    const [img, setImg] = useState(new Image()); 
    const [myStyle, setStyle] = useState({ width: '100%', display: 'none' });
    const classes = useStyles();


    function onChange(event) {
        resultDisplay([]);
        var fileObj = event.target.files[0];
        setFilename(fileObj.name);
        let reader = new FileReader();
        reader.onload = (e) => {
          setFile(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);


    }

    const onSubmit = async (event) => {
        event.preventDefault();
         // Pre-process the image
         setStyle({ width: '100%', display: 'block' });
      
         const img = new Image();
         img.src = file;
 


	const model = await tf.loadLayersModel('https://flamboyant-swartz-753878.netlify.app/final_model_kaggle_version1/model.json');
	let tensor = tf.browser.fromPixels(img)
	.resizeNearestNeighbor([224,224])
	.toFloat();
	
	
	let offset = tf.scalar(127.5);
	
	tensor = tensor.sub(offset)
	.div(offset)
	.expandDims();
	
	

    const SKIN_CLASSES = {
        0: 'Actinic Keratoses (Solar Keratoses) or intraepithelial Carcinoma (Bowen’s disease) [akiec]',
        1: 'Basal Cell Carcinoma [bcc]',
        2: 'Benign Keratosis [bkl]',
        3: 'Dermatofibroma [df]',
        4: 'Melanoma [mel]',
        5: 'Melanocytic Nevi [nv]',
        6: 'Vascular skin lesion [vasc]'
    
    };
  

    console.log(tensor);
	
	
	// Pass the tensor to the model and call predict on it.
	// Predict returns a tensor.
	// data() loads the values of the output tensor and returns
	// a promise of a typed array when the computation is complete.
	// Notice the await and async keywords are used together.
  let predictions = await model.predict(tensor).data();
  
  setStyle({ width: '100%', display: 'none' });
  
	let top5 = Array.from(predictions)
		.map(function (p, i) { // this is Array.map
			return {
				probability: p,
				className: SKIN_CLASSES[i] // we are selecting the value from the obj
			};
				
			
		}).sort(function (a, b) {
			return b.probability - a.probability;
				
        }).slice(0, 3);

    console.log(top5);
        

    resultDisplay(top5);


    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Upload Photo
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Upload Skin Lesion Image"
                name="email"
                autoComplete="text"
                value={fileName}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={onChange}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
            </label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SampleImages setResult={resultDisplay} setImgUrl={setFile} />
            </Grid>
            <Grid item xs={12}>
              <img src={file} height="300" width="300" alt="Image Preview"/>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Predict
          </Button>
          <Grid container justify="flex-end">
            <Grid item style={myStyle}>
                <LinearProgress/>
            </Grid>
          </Grid>
          

        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
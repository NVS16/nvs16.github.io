import React, {useState} from 'react'
import Navbar from './Navbar.js';
import { Grid, Button } from '@material-ui/core';
import ModelForm from './ModelForm';
import Results from './Results';

function Model() {

    const [results, setResults] = useState([]);

    return (
        <Grid container
        direction="column"
        >
            <Grid item>
                <Navbar />
            </Grid>
            <Grid item container>
                <Grid item xs={0} sm={2}></Grid>
                <Grid container item xs={12} sm={8}>
                    <ModelForm resultDisplay={setResults}/>
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
            </Grid>
            <Grid item container>
                <Grid item xs={0} sm={2}></Grid>
                <Grid container item xs={12} sm={8}>
                    <Results results={results}/>
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
            </Grid>
        </Grid>
    );
}

export default Model;

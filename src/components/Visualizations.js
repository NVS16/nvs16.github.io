import React from 'react'
import Navbar from './Navbar.js';
import { Grid } from '@material-ui/core';

function Visualizations() {
    return (
        <Grid container
        direction="column"
        >
            <Grid item>
                <Navbar />
            </Grid>
            <Grid item container>
                <Grid item xs={0} sm={2}></Grid>
                <Grid item xs={12} sm={8}>Viz</Grid>
                <Grid item xs={0} sm={2}></Grid>
            </Grid>
        </Grid>
    );
}

export default Visualizations

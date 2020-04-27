import React from 'react'
import Navbar from './Navbar.js';
import { Grid } from '@material-ui/core';
import FirstSVG from '../images/1.svg';
import SecondSVG from '../images/2.svg';
import ThirdSVG from '../images/3.svg';
import FourthSVG from '../images/4.svg';
import FifthSVG from '../images/5.svg';
import SixthSVG from '../images/6.svg';

function Home() {
    return (
        <Grid container
        direction="column"
        >
            <Grid item>
                <Navbar />
            </Grid>
            <Grid item container>
                <Grid item xs={0} sm={2}></Grid>
                <Grid item xs={12} sm={8}>Home
                    <img src={FirstSVG} height="300" width="300"></img>
                    <img src={SecondSVG} height="300" width="300"></img>
                    <img src={ThirdSVG} height="300" width="300"></img>
                    <img src={FourthSVG} height="300" width="300"></img>
                    <img src={FifthSVG} height="300" width="300"></img>
                    <img src={SixthSVG} height="300" width="300"></img>
                </Grid>
                <Grid item xs={0} sm={2}></Grid>
            </Grid>
        </Grid>
    );
}

export default Home;

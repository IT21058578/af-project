import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer';
import DetailCard from '../../components/Tour/packageDetailCards';
import Recomended from '../../components/Tour/RecomendedPackages';
import Hotel from '../../components/Tour/tourImageList';
import Total from '../../components/Tour/bookingTotal';
import TourGuid from '../../components/Tour/tourGuidMassage';

export default function TourDetails() {
  return (
    <div>
    <Navbar/>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} md={12}>
          <Hotel/>
        </Grid>
        <Grid item xs={6} md={6}>
          <DetailCard/>
        </Grid>
        <Grid item xs={6} md={6}>
          <Total/>
        </Grid>
        <Grid item xs={6} md={12}>
          <TourGuid/>
        </Grid>
        <Grid item xs={6} md={12}>
          <Recomended/>
        </Grid>
      </Grid>
    </Box>
    <Footer />
    </div>
  );
}
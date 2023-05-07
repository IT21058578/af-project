import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Navbar from '../../components/NavBar/NavBar';
import DetailCard from '../../components/Tour/packageDetailCards';
import Recomended from '../../components/Tour/RecomendedPackages';
import Hotel from '../../components/Tour/tourImageList';
import Total from '../../components/Tour/bookingTotal';
import TourGuid from '../../components/Tour/tourGuidMassage';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    </div>
  );
}
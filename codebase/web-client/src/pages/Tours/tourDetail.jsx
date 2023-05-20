import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer';
import DetailCard from '../../components/Tour/packageDetailCards';
import Recomended from '../../components/Tour/RecomendedPackages';
import Hotel from '../../components/Tour/tourImageList';
import Total from '../../components/Tour/bookingTotal';
import TourGuid from '../../components/Tour/tourGuidMassage';
import './loading.css';
import { useParams} from "react-router-dom";
import { useLazyGetTripPackgeQuery } from "../../store/api/package-api-slice";
import { useLazySearchTripPackgesQuery } from "../../store/api/package-api-slice";

const TourDetails = () => {

  const { tripPackageId } = useParams();
  const [getTripPackageQuery, { data: tripPackage, isLoading, isError }] = useLazyGetTripPackgeQuery();

  const [fetchPackages , {data: packages }] = useLazySearchTripPackgesQuery();

  useEffect(() => {
    fetchPackages({});
  }, [fetchPackages]);


  useEffect(() => {
    console.log(tripPackageId)
    if (tripPackageId) {
      getTripPackageQuery({ tripPackageId });
    }
  }, [getTripPackageQuery, tripPackageId]);


  if (isLoading) {
    return <div>
      <div className="loader-container">
      	  <div className="spinner"></div>
      </div>
    </div>;
  }

  if (isError) {
    return <div>Error occurred while fetching package details</div>;
  }


  return (
    <div>
    <Navbar/>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} md={12}>
          <Hotel tripPackage={tripPackage}/>
        </Grid>
        <Grid item xs={6} md={6}>
          <DetailCard tripPackage={tripPackage}/>
        </Grid>
        <Grid item xs={6} md={6}>
          <Total tripPackage={tripPackage}/>
        </Grid>
        <Grid item xs={6} md={12}>
          <TourGuid/>
        </Grid>
        <Grid item xs={6} md={12}>
          {packages?.content && packages?.content?.length > 0 ? (
            <Recomended packages={packages?.content} />
          ) : (
            <div>No packages found.</div>
          )}
        </Grid>
      </Grid>
    </Box>
    <Footer />
    </div>
  );
}

export default TourDetails;
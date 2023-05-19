import React, { useEffect } from "react";
import Hero from "../../components/Tour/BookingImgPost";
import Navbar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer";
import Services from "../../components/Tour/Services";
import Package from "../../components/Tour/packages";
import './loading.css';

import { Box } from "@mui/material";
import { useLazySearchTripPackgesQuery } from "../../store/api/package-api-slice";


function TourHome(){

  const [fetchPackages , {data: packages , isLoading , isError , error }] = useLazySearchTripPackgesQuery();

  useEffect(() => {
    fetchPackages({});
  }, [fetchPackages]);

  if(isLoading){
    return <div>
      <div className="loader-container">
      	  <div className="spinner"></div>
      </div>
    </div>
  }

  if(isError){
    return<div>Error: {error.message}</div>
  }
    return (
        <div>
          <Navbar/>
          <Hero />
          <Box sx={{marginLeft:'30px', marginRight:'30px'}}>
            <Services/>
          </Box>
          {packages?.content && packages?.content?.length > 0 ? (
            <Package packages={packages?.content} />
          ) : (
            <div>No packages found.</div>
          )}
          <Footer />
        </div>
      );
}

export default TourHome;
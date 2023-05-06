import React from "react";
import Hero from "../../components/Tour/BookingImgPost";
import Navbar from "../../components/NavBar/NavBar";
import Services from "../../components/Tour/Services";
import Package from "../../components/Tour/packages";
import { Box } from "@mui/material";


function TourHome(){
    return (
        <div>
          <Navbar/>
          <Hero />
          <Box sx={{marginLeft:'30px', marginRight:'30px'}}>
            <Services/>
          </Box>
          <Package/>
        </div>
      );
}

export default TourHome;
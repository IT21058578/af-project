import React from "react";
import Hero from "../../components/Tour/BookingImgPost";
import Navbar from "../../components/NavBar/NavBar";
import Services from "../../components/Tour/Services";
import Recommend from "../../components/Tour/RecomendedPackages";
import { Box } from "@mui/material";


function TourHome(){
    return (
        <div>
          <Navbar/>
          <Hero />
          <Box sx={{marginLeft:'30px', marginRight:'30px'}}>
            <Services/>
          </Box>
          <Recommend/>
        </div>
      );
}

export default TourHome;
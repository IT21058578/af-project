import React, { useEffect } from "react";
import AdminLocation from "./adminLocationList";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../../pages/Tours/loading.css';
import { useLazySearchLocationsQuery } from "../../store/api/location-api-slice";
import AddIcon from '@mui/icons-material/Add';

function AdminLocationHome(){

  const [fetchLocations , {data: locations , isLoading , isError , error }] = useLazySearchLocationsQuery();

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/addlocation");
  };

  useEffect(() => {
    fetchLocations({});
  }, [fetchLocations]);

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
        <Button variant="contained" color="success" sx={{marginLeft:'70px'}} onClick={handleAddButtonClick} startIcon={<AddIcon />}>
            Add Location
        </Button>
          {locations?.content && locations?.content?.length > 0 ? (
            <AdminLocation locations={locations?.content} />
          ) : (
            <div>No locations found.</div>
          )}
        </div>
      );
}

export default AdminLocationHome;
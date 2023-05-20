import React, { useEffect } from "react";
import AdminPackage from "./adminPackageList";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../../pages/Tours/loading.css';
import { useLazySearchTripPackgesQuery } from "../../store/api/package-api-slice";
import AddIcon from '@mui/icons-material/Add';

function AdminTourHome(){

  const [fetchPackages , {data: packages , isLoading , isError , error }] = useLazySearchTripPackgesQuery();

  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/addtrip");
  };

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
        <Button variant="contained" color="success" sx={{marginLeft:'70px'}} onClick={handleAddButtonClick} startIcon={<AddIcon />}>
            Add Package
        </Button>
          {packages?.content && packages?.content?.length > 0 ? (
            <AdminPackage packages={packages?.content} />
          ) : (
            <div>No packages found.</div>
          )}
        </div>
      );
}

export default AdminTourHome;
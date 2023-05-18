import React, { useEffect } from "react";
import AdminPackage from "./adminPackageList";
import '../../pages/Tours/loading.css';
import { useLazySearchTripPackgesQuery } from "../../store/api/package-api-slice";


function AdminTourHome(){

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
          {packages?.content && packages?.content?.length > 0 ? (
            <AdminPackage packages={packages?.content} />
          ) : (
            <div>No packages found.</div>
          )}
        </div>
      );
}

export default AdminTourHome;
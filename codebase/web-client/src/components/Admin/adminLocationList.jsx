import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useDeleteLocationsMutation } from "../../store/api/location-api-slice";
import { useLazyGetLocationsQuery } from "../../store/api/location-api-slice";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const AdminLocation = ({locations}) =>{
  
  const navigate = useNavigate();
  const [getLocationQuery] = useLazyGetLocationsQuery();
  const [deleteLocation] = useDeleteLocationsMutation();
  
  const handleDelete = async (id) => {
    try {
      await deleteLocation({ locationId: id });
      // Perform any other necessary tasks upon successful deletion
      navigate(`/admin`) // Navigate back to the trip Location list page
    } catch (error) {
      console.log('Error deleting Location:', error);
    }
  };

  const handleEditDetails = (locationId) => {
    getLocationQuery({ locationId }).then((result) => {
      if (!result.error) {
        navigate(`/location/edit/${locationId}`);
      }
    });
  };

  // const [loc, setloc] = useState(data);
  return (
    <Section id="recommend">
      <div className="title" style={{marginBottom:'20px'}}>
        <h2>Manage Locations</h2>
      </div>
      <div className="destinations">
        {locations.map((location) => {
          return (
            <div className="destination" key={location.id}>
              <h3>{location.name}</h3>
              <Button variant="outlined" color="success" onClick={() => handleEditDetails(location.id)}>Edit Location</Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(location.id)}>Delete Location</Button>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default AdminLocation;

const Section = styled.section`
  padding: 2rem 0;
  .title {
    color:black;
    text-align: center;
  }
  .Locations {
    color:black;
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ul {
      display: flex;
      list-style-type: none;
      width: max-content;
      li {
        padding: 1rem 2rem;
        border-bottom: 0.1rem solid black;
      }
      .active {
        border-bottom: 0.5rem solid #8338ec;
      }
    }
  }
  .destinations {
    color:black;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 0 3rem;
    .destination {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #8338ec14;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
      }
      .info {
        display: flex;
        align-items: center;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 1rem;
            background-color: #4d2ddb84;
            width: 2rem;
            /* padding: 1rem; */
            padding: 0.3rem 0.4rem;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .distance {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .Locations {
      ul {
        li {
          padding: 0 0.5rem;
          font-size: 2vh;
          padding-bottom: 1rem;
        }
        .active {
          border-bottom-width: 0.3rem;
        }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;
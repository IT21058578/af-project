import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetTripPackgeQuery } from "../../store/api/package-api-slice";
import { useDeleteTripPackgeMutation } from "../../store/api/package-api-slice";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const AdminPackage = ({packages}) =>{
  
  const navigate = useNavigate();
  const [getTripPackageQuery] = useLazyGetTripPackgeQuery();
  const [deleteTripPackage] = useDeleteTripPackgeMutation();
  
  const handleDelete = async (id) => {
    try {
      await deleteTripPackage({ tripPackageId: id });
      // Perform any other necessary tasks upon successful deletion
      navigate(`/admin`) // Navigate back to the trip package list page
    } catch (error) {
      console.log('Error deleting trip package:', error);
    }
  };

  const handleEditDetails = (tripPackageId) => {
    getTripPackageQuery({ tripPackageId }).then((result) => {
      if (!result.error) {
        navigate(`/tour/edit/${tripPackageId}`);
      }
    });
  };

  // const [tour, setTour] = useState(data);
  return (
    <Section id="recommend">
      <div className="title" style={{marginBottom:'20px'}}>
        <h2>Manage Destinations</h2>
      </div>
      <div className="destinations">
        {packages.map((tour) => {
          return (
            <div className="destination" key={tour.id}>
              <h3>{tour.name}</h3>
              <Button variant="outlined" color="success" onClick={() => handleEditDetails(tour.id)}>Edit Package</Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(tour.id)}>Delete Package</Button>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default AdminPackage;

const Section = styled.section`
  padding: 2rem 0;
  .title {
    color:black;
    text-align: center;
  }
  .packages {
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
    .packages {
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
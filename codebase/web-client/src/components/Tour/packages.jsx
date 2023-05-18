import React, { useState } from "react";
import styled from "styled-components";
import info1 from "../../assets/info1.png";
import info2 from "../../assets/info2.png";
import info3 from "../../assets/info3.png";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetTripPackgeQuery } from "../../store/api/package-api-slice";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const Package = ({packages}) =>{
  
  const navigate = useNavigate();
  const [getTripPackageQuery] = useLazyGetTripPackgeQuery();

  const handleViewDetails = (tripPackageId) => {
    getTripPackageQuery({ tripPackageId }).then((result) => {
      if (!result.error) {
        navigate(`/tour/details/${tripPackageId}`);
      }
    });
  };


  const typepackages = [
    "New Packages",
    "Most Popular Packages",
    "Short Term Travel",
    "Long Term Slow Travel",
  ];

  const [active, setActive] = useState(1);
  // const [tour, setTour] = useState(data);
  return (
    <Section id="recommend">
      <div className="title">
        <h2>Explore Destinations</h2>
      </div>
      <div className="packages">
        <ul>
          {typepackages.map((pkg, index) => {
            return (
              <li
                className={active === index + 1 ? "active" : ""}
                onClick={() => setActive(index + 1)}
              >
                {pkg}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="destinations">
        {packages.map((tour) => {
          return (
            <div className="destination" key={tour.id}>
              <Button onClick={() => handleViewDetails(tour.id)}>View detail</Button>
              {/* <Link to={`/tour/details/${tour.name}`}>View details</Link> */}
              <img src={packages.imageURLs} alt="" />
              <h3>{tour.name}</h3>
              {/* <p>{packages.subTitle}</p> */}
              <div className="info">
                <div className="services">
                  <img src={info1} alt="" />
                  <img src={info2} alt="" />
                  <img src={info3} alt="" />
                </div>
                {/* <h4>{packages.cost}</h4> */}
              </div>
              <div className="distance">
                {/* <span>1000 Kms</span> */}
                <span>{tour.totalDistance} Kms</span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default Package;

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
import React, { useState } from "react";
import styled from "styled-components";
import info1 from "../../assets/info1.png";
import info2 from "../../assets/info2.png";
import info3 from "../../assets/info3.png";
import { Link } from "react-router-dom";
import { useLazyGetTripPackgeQuery } from "../../store/api/package-api-slice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Package= ({ packages }) => {
 
  const navigate = useNavigate();
  const [getTripPackageQuery] = useLazyGetTripPackgeQuery();
  const [active, setActive] = useState(1);

  const handleViewDetails = (tripPackageId) => {
    getTripPackageQuery({ tripPackageId }).then((result) => {
      if (!result.error) {
        navigate(`/tour/details/${tripPackageId}`);
      }
    });
  };

  return (
    <Section id="recommend">
      <div className="title">
        <h2>Recommended Destinations</h2>
      </div>
      <div className="packages">
        <ul>
        </ul>
      </div>
      <div className="destinations">
        {packages.map((destination) => {

          const lodging = new Number(destination?.price?.lodging?.threeStar);
          const perPerson = new Number(destination?.price?.perPerson);
          const perPersonFood = new Number(destination?.price?.perPersonFood);
          const transport = new Number(destination?.price?.transport?.group);

          const sum = lodging + perPerson + perPersonFood + transport;

          return (
            <div className="destination" key={destination.id}>
             <Button onClick={() => handleViewDetails(destination.id)}>View detail</Button>
              <img src={destination.imageURl} alt="" />
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
              <div className="info">
                <div className="services">
                  <img src={info1} alt="" />
                  <img src={info2} alt="" />
                  <img src={info3} alt="" />
                </div>
                <h4>LKR: {sum}</h4>
              </div>
              <div className="distance">
                <span>{destination.totalDistance} Kms</span>
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
import React, { useState } from "react";
import styled from "styled-components";
import info1 from "../../assets/info1.png";
import info2 from "../../assets/info2.png";
import info3 from "../../assets/info3.png";
import { Link } from "react-router-dom";

export default function Package() {
  const data = [
    {
      image: "https://assets.traveltriangle.com/blog/wp-content/uploads/2014/11/Yala-National-Park-in-Sri-Lanka_23rd-oct.jpg",
      title: "Yala",
      subTitle: "Home To A Host Of Wildlife And Birds",
      cost: "1,000",
      duration: "Approx 2 night trip",
    },
    {
      image: "https://res.cloudinary.com/thrillophilia/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_auto,h_600,q_auto,w_auto/v1/filestore/9kabqd8s5e0rjw51vpwfbjku9wxd_couple%20at%20bentota.jpg",
      title: "Benthota",
      subTitle: "Weekend Island Break with Colombo and Bentota",
      cost: "1,200",
      duration: "Approx 2 night trip",
    },
    {
      image: "https://res.cloudinary.com/thrillophilia/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_auto,h_600,q_auto,w_auto/v1/filestore/twgr8e61ekm83i2swa2f93fpozrx_Nuwara%20Eliya%2010.jpg",
      title: "Kandy",
      subTitle: "Sweet Escapade to Sri Lanka with Kandy",
      cost: "2,500",
      duration: "Approx 2 night trip",
    },
    {
      image: "https://res.cloudinary.com/thrillophilia/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_auto,h_600,q_auto,w_auto/v1/filestore/7xvzjq6q8ch5a5ueq3rw9ng77k08_%5BDownloader.la%5D-619ca07794280.jpg",
      title: "Mirissa",
      subTitle: "1 Day Splendors of Sri Lanka with Mirissa",
      cost: "1,100",
      duration: "Approx 1 night trip",
    },
    {
      image: "https://assets.traveltriangle.com/blog/wp-content/uploads/2015/02/Sea-Surfing-at-Arugam-Bay.jpg",
      title: "Arugam Bay",
      subTitle: "Turquoise Heaven For Adrenaline-Junkies",
      cost: "1,400",
      duration: "Approx 2 night 2 day trip",
    },
    {
      image: "https://assets.traveltriangle.com/blog/wp-content/uploads/2015/02/Sigiriya-rock-fortress-in-Sri-Lanka.jpg",
      title: "Sigiriya and Polonnaruwa",
      subTitle: "Ruggedness Amidst The Greenery",
      cost: "2,800",
      duration: "Approx 3 night 2 day trip",
    },
  ];

  const packages = [
    "New Packages",
    "Most Popular Packages",
    "Short Term Travel",
    "Long Term Slow Travel",
  ];

  const [active, setActive] = useState(1);
  const [tour, setTour] = useState(data);
  return (
    <Section id="recommend">
      <div className="title">
        <h2>Explore Destinations</h2>
      </div>
      <div className="packages">
        <ul>
          {packages.map((pkg, index) => {
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
        {tour.map((destination) => {
          return (
            <div className="destination" key={destination.title}>
              <Link to={`/deatails`}>View details</Link>
              <img src={destination.image} alt="" />
              <h3>{destination.title}</h3>
              <p>{destination.subTitle}</p>
              <div className="info">
                <div className="services">
                  <img src={info1} alt="" />
                  <img src={info2} alt="" />
                  <img src={info3} alt="" />
                </div>
                <h4>{destination.cost}</h4>
              </div>
              <div className="distance">
                <span>1000 Kms</span>
                <span>{destination.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

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
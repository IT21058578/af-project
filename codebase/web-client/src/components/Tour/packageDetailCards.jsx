import React from "react";
import styled from "styled-components";
import service1 from "../../assets/service1.png";

const LocationList = ({ locations }) => {
  return (
    <ul className="list">
      {locations.map(location => (
        <li key={location}>{location}</li>
      ))}
    </ul>
  );
};

export default function DetailCard() {
  const data = [
    {
      images: [service1],
      title: "Yala",
      description: "Yala National Park is expected to be closed again this year, from September 1 to October 15. It is the height of the annual drought in the area but Park officials also use the time to attend to development work.",
      locations:["Yala safari","Yala camping","Culturel event"],
      catogery:"new",
      days:"2",
      packagePrice:1000.00
    },
  ];
  return (
    <Section id="services">
      {data.map((service, index) => {
        return (
          <div className="service">
            <div className="title">
               <h3>{service.title}</h3>
            </div>
            <h3 className="hed">Description</h3>
            <p className="description">{service.description}</p>
            <h3 className="hed">Locations That you can visit</h3>
            <LocationList locations={service.locations}></LocationList>
            <div className="hed">
              <h3>Days of tour: </h3>
              <span >{service.days}</span>
            </div>
            <div className="hed">
              <h3>Price Starts from: </h3>
              <span >{service.packagePrice}$</span>
            </div>
          </div>
        );
      })}
    </Section>
  );
}

const Section = styled.section`
  padding: 2rem 0;
  display: grid;
  .service {
    margin-left: 55px;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
    color:black;
    padding: 2rem;
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
  .description {
    color:#9CA777;
    font-family: "Gill Sans", sans-serif;
  }
  .title{
    text-align: center;
    color: #9CA777; 
    font-family: "Gill Sans", sans-serif;
    font-size: 30px; 
    font-weight: 300; 
    text-align: center; 
  }
  .hed{
    color: orange; 
    display: inline-block;
  }
  .list{
    font-family: "Gill Sans", sans-serif;
    color:#9CA777;
  }
`;
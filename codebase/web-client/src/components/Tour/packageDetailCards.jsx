import React from "react";
import styled from "styled-components";
import service1 from "../../assets/service1.png";

export default function DetailCard() {
  const data = [
    {
      images: [service1],
      title: "Yala",
      subTitle:"Pay through our application and save thousands and get amazing rewards.",
      description: "Yala safari tour",
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
            <div className="icon">
               <h3>{service.title}</h3>
            </div>
            <p>{service.subTitle}</p>
            <p>{service.description}</p>
            <p>{service.locations}</p>
            <p>{service.days}</p>
            <p>{service.packagePrice}</p>

          </div>
        );
      })}
    </Section>
  );
}

const Section = styled.section`
  padding: 2rem 0;
  display: grid;
  gap: 1rem;
  .service {
    display: flex;
    flex-direction: column;
    color:black;
    gap: 1rem;
    padding: 2rem;
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: 0.3s ease-in-out;
    &:hover {
      transform: translateX(0.4rem) translateY(-1rem);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    .icon {
      img {
        height: 2.4rem;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
import React from "react";
import styled from "styled-components";

const avatarImage = "https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" 
export default function TourGuid() {
  return (
    <Section id="testimonials">
      <div className="title">
        <h2>Your Guids</h2>
      </div>
      <div className="testimonials">
        <div className="testimonial">
          <p>
          I have spent my life in this remarkable country, and have helped countless foreign guests to 
          visit and appreciate its many cultural and historic treasures.
          </p>
          <div className="info">
            <img src={avatarImage} alt="" />
            <div className="details">
              <h4>Dinuka Dissanayaka</h4>
              <span>10 years expirienced guid</span>
            </div>
          </div>
        </div>
        <div className="testimonial">
          <p>
          I speak excellent English, and can assist you throughout your stay in Sri Lanka. I can arrange and lead tours to meet 
          every requirement, and can also advise on travel, hotels, etc...
          </p>
          <div className="info">
            <img src={avatarImage} alt="" />
            <div className="details">
              <h4>Tharidu Sampath</h4>
              <span>15 years expirienced guid</span>
            </div>
          </div>
        </div>
        <div className="testimonial">
          <p>
          Many guests have returned on a regular basis, and I am delighted that they 
          have also become my good friends – I hope you will want to do the same!
          </p>
          <div className="info">
            <img src={avatarImage} alt="" />
            <div className="details">
              <h4>Sansika Kodithuwakku</h4>
              <span>15 years expirienced guid</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 5rem 0;
  .title {
    color:black;
    text-align: center;
    margin-bottom: 2rem;
  }
  .testimonials {
    color:black;
    display: flex;
    justify-content: center;
    margin: 0 2rem;
    gap: 2rem;
    .testimonial {
      background-color: aliceblue;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      .info {
        display: flex;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;
        img {
          border-radius: 3rem;
          height: 3rem;
        }
        .details {
          span {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .testimonials {
      flex-direction: column;
      margin: 0;
      .testimonial {
        justify-content: center;
        .info {
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
`;
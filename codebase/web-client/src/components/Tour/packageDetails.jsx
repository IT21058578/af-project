import React from 'react';
import { useParams } from 'react-router-dom';

function DetailView() {

    const datas = [
        {
          image: Destination1,
          title: "Singapore",
          subTitle: "Singapore, officialy thr Republic of Singapore, is a",
          cost: "38,800",
          duration: "Approx 2 night trip",
        },
        {
          image: Destination2,
          title: "Thailand",
          subTitle: "Thailand is a Southeast Asia country. It's known for",
          cost: "54,200",
          duration: "Approx 2 night trip",
        },
        {
          image: Destination3,
          title: "Paris",
          subTitle: "Paris, France's capital, is a major European city and a",
          cost: "45,500",
          duration: "Approx 2 night trip",
        },
        {
          image: Destination4,
          title: "New Zealand",
          subTitle: "New Zealand is an island country in the",
          cost: "24,100",
          duration: "Approx 1 night trip",
        },
        {
          image: Destination5,
          title: "Bora Bora",
          subTitle: "Bora Bora is a small South Pacific island northwest of",
          cost: "95,400",
          duration: "Approx 2 night 2 day trip",
        },
        {
          image: Destination6,
          title: "London",
          subTitle: "London, the capital of England and the United",
          cost: "38,800",
          duration: "Approx 3 night 2 day trip",
        },
      ];

  const { title } = useParams();
  const data = datas.find(d => d.title === title);

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <p>{data.content}</p>
    </div>
  );
}

export default DetailView;
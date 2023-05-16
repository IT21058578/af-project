import "./details.css";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from "react";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const photos = [
    {
      src: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6a/e4/df.jpg",
    },
    {
      src: "https://www.trawell.in/admin/images/upload/1894272Yala_Jeep_Safari.jpg",
    },
    {
      src: "https://travellersisle.com/wp-content/uploads/2021/06/Yala-national-park-closure.jpg",
    },
    {
      src: "https://img.traveltriangle.com/blog/wp-content/uploads/2017/10/Traveler-Reviews-for-Yala-National-Park.jpg",
    },
    {
      src: "https://www.astraltravelsrilanka.com/wp-content/uploads/2021/12/yala-safari-arugam-bay.jpg",
    },
    {
      src: "https://flashpackingfamily.com/wp-content/uploads/2019/12/Yala-National-park-leopard-sighting.jpg",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div>
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <CancelIcon
              className="close"
              onClick={() => setOpen(false)}
            />
            <ArrowCircleLeftIcon
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <ArrowCircleRightIcon
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <h1 className="hotelTitle">Yala national park</h1>
          <div className="hotelAddress">
            <LocationOnIcon/>
            <span>Sri Lanka</span>
          </div>
          <span className="hotelDistance">
            Excellent location to visit
          </span>
          <span className="hotelPriceHighlight">
            Famous For: Wildlife, Flora & Fauna
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
// import * as React from 'react';
// import Slide from '@mui/material/Slide';
// // import CarouselItem from '@mui/material/CarouselItem';
// import { styled } from '@mui/material/styles';

// const images = [
//   {
//     id: 1,
//     src: 'https://picsum.photos/500/300?random=1',
//     alt: 'Slide 1',
//   },
//   {
//     id: 2,
//     src: 'https://picsum.photos/500/300?random=2',
//     alt: 'Slide 2',
//   },
//   {
//     id: 3,
//     src: 'https://picsum.photos/500/300?random=3',
//     alt: 'Slide 3',
//   },
// ];

// const CarouselItem = styled('div')(({ theme }) => ({
//     height: '400px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: theme.palette.background.paper,
//   }));

// export default function AutomaticCarousel() {
//   const [activeIndex, setActiveIndex] = React.useState(0);

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000); // Change slide every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <Slide
//       autoPlay={false}
//       animation="slide"
//       indicators={false}
//       index={activeIndex}
//       sx={{ height: '300px' }}
//     >
//       {images.map((image) => (
//         <CarouselItem key={image.id}>
//           <img src={image.src} alt={image.alt} />
//         </CarouselItem>
//       ))}
//     </Slide>
//   );
// }

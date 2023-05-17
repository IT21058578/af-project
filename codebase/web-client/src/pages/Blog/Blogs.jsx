import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './Blog';
import Pagination from '../../components/Pagination';
// import Carousel from '../../components/Carousel';
// import Main from './Main';
// import Sidebar from './Sidebar';
// import Footer from './Footer';
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar/NavBar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import CardMedia from '@mui/material/CardMedia';
import video from '../../assets/travelVideo.mp4';
import SL from '../../assets/SL.png';
import { Link } from 'react-router-dom';
import TourGuideLink from '../../components/TourGuideLink';


const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'When can we travel to Sri Lanka in 2022?',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://d3k9ljo62xl25w.cloudfront.net/media/images/WhenCanWeTravelTo_SriLanka_22.original.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: '10 Best Places to Visit in Sri Lanka',
    date: 'Jan 12, 2023',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://www.traveldailymedia.com/assets/2022/10/shutterstock_1046627314.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: '7 Great things to do in Jaffna',
    date: 'Nov 11, 2022',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://www.backpackerbanter.com/blog/wp-content/uploads/2018/11/best-places-to-visit-in-sri-lanka-backpacker-travel-sigiriya-kandy-dambulla-elephants-1920x1014.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: 'Safari in Yala',
    date: 'Nov 11, 2022',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://www.journeyera.com/wp-content/uploads/2018/01/sri-lanka-photos-8716.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: 'Sigiriya Lion Rock',
    date: 'Nov 11, 2022',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://www.experiencetravelgroup.com/blog/wp-content/uploads/2013/03/Sri-Lanka-3.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: '9 Unmissable Things To Do in Unawatuna, Sri Lanka',
    date: 'Nov 11, 2022',
    description:
      'This is a wider card with supporting text',
    image: 'https://static.saltinourhair.com/wp-content/uploads/2018/06/23120224/best-sri-lanka-route-guide.jpg',
    imageLabel: 'Image Text',
  },
  {
    title: '9 Great things to do in Kandy',
    date: 'Nov 11, 2022',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://worldtravelfamily.com/wp-content/uploads/2013/12/Sri-Lanka-Travel-Blog.jpg',
    imageLabel: 'Image Text',
  },
  // {
  //   title: 'Post title',
  //   date: 'Nov 11',
  //   description:
  //     'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //   image: 'https://source.unsplash.com/random',
  //   imageLabel: 'Image Text',
  // },
  // {
  //   title: 'Post title',
  //   date: 'Nov 11',
  //   description:
  //     'This is a wider card with supporting text below as a natural lead-in to additional content.',
  //   image: 'https://source.unsplash.com/random',
  //   imageLabel: 'Image Text',
  // },
];

// const posts = [post1, post2, post3];

const theme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <Link to="/blog/new">
        <Fab aria-label="edit" variant="extended" sx={{ position: 'fixed', marginLeft: '80%', marginTop: '550px' }}>
          <EditIcon sx={{ mr: 1 }} /> Write a blog
        </Fab>
      </Link>

      <CssBaseline />
      <div>
      <NavBar style={{ position: 'absolute', zIndex: 1 }} />
      <CardMedia
        component="video"
        autoPlay
        loop
        muted
        src={video}
        style={{ height: '60%', marginTop: '-360px' }}
      />
      </div>
      <br></br>
      <Container maxWidth="xl">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            {/* <Main title="From the firehose" posts={posts} /> */}
          </Grid>
          <Pagination />
        </main>
      </Container>
      <CardMedia
            component="img"
          
            image={SL}
            alt="Example Image"
          />
      <TourGuideLink />
      <Footer />
    </ThemeProvider>
  );
}
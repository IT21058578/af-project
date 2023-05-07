import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Blog from './Blog/Blog';
import Navbar from '../components/NavBar/NavBar';
import Footer from '../components/Footer';

const author = {
    name: 'John Doe',
    profilePicture:
      'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  };
  
  const posts = [
    {
        id: 1,
        title: '10 Best Places to Visit in Sri Lanka',
        date: 'Jan 12, 2023',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://www.traveldailymedia.com/assets/2022/10/shutterstock_1046627314.jpg',
        likes: 5,
      },
      {
        id: 2,
        title: '7 Great things to do in Jaffna',
        date: 'Nov 11, 2022',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://www.backpackerbanter.com/blog/wp-content/uploads/2018/11/best-places-to-visit-in-sri-lanka-backpacker-travel-sigiriya-kandy-dambulla-elephants-1920x1014.jpg',
        likes: 10,
      },
      {
        id: 3,
        title: 'Safari in Yala',
        date: 'Nov 11, 2022',
        description:
          'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://www.journeyera.com/wp-content/uploads/2018/01/sri-lanka-photos-8716.jpg',
        likes: 15,
      },
  ];

const AuthorPage = () => {

  // Filter posts to only show those authored by the selected author
//   const authorPosts = posts.filter(post => post.author === author);
  const authorPosts = posts;

  // Calculate the total likes count of the author's posts
  const totalLikes = authorPosts.reduce((total, post) => total + post.likes, 0);

  return (
    <div>
    <Navbar />
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Grid container spacing={4} justifyContent="center">
    
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Avatar sx={{ width: 120, height: 120, mb: 2 }} src={author.picture} />
            <Typography variant="h5">{author.name}</Typography>
            <Typography variant="subtitle1">{`${authorPosts.length} posts`}</Typography>
            <Typography variant="subtitle1">{`${totalLikes} likes`}</Typography>
          </Box>
            
          <Grid container spacing={4} sx={{margin:'5%', marginTop:'20px'}}>
            {authorPosts.map(post => (
                <Blog post={post} key={post.id} />
            ))}
          </Grid>
        
      </Grid>
    </Box>
    <Footer />
    </div>
  );
};

export default AuthorPage;

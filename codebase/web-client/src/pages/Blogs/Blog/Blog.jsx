import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
// import { useDispatch } from 'react-redux';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

function FeaturedPost(props) {
  const { post } = props;

  const [likes, setLikes] = useState(post?.likes);
  // const dispatch = useDispatch();

  // const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    // if (likes.length > 0) {
    //   return likes.find((like) => like === userId)
    //     ? (
    //       <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length}</>
    //     ) : (
    //       <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} </>
    //     );
    // }

    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;</>;
  };

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex', borderRadius: '20px' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
            {/* <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
              <Likes />
            </Button> */}<br></br>
            <Button size="small" color="primary" onClick={handleLike} sx={{ marginLeft: '0%' }}>
              <Likes />
            </Button>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 400, display: { xs: 'none', sm: 'block' }, transition: 'transform .2s', '&:hover': {
              transform: 'scale(1.1)', 
            }, }}
            image={post.image}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
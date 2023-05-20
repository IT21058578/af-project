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
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useDispatch } from 'react-redux';
import { useLazyGetPostQuery, useLikeDislikePostMutation } from "../../store/api/posts-api-slice";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Link from '@mui/material/Link';

function FeaturedPost({post, setCurrentId}) {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getPost, { data: postData, isSuccess: isFetchPostSuccess }] = useLazyGetPostQuery();
  const userId = user?.result.googleId || user?.result?._id;
  // const hasLikedPost = likes.find((like) => like === userId);

  // const [likes, setLikes] = useState(postDetails?.likes);
  // const hasLikedPost = likes.find((like) => like === userId);
  const [likeDislikePost] = useLikeDislikePostMutation();

  const handleLike = async () => {
    await likeDislikePost({ postId: post._id });

    if (post.isLiked) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length}</>
        ) : (
          <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} </>
        );
    }

    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;</>;
  };

  const openPost = () => {
    dispatch(getPost(postData._id));
    navigate(`/blog/${post._id}`);
  };


  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" onClick={openPost}>
        <Card sx={{ display: 'flex', borderRadius: '20px', backgroundColor: '#F1DEC9', height:'300px' }}>
          <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {post.title.length > 30 ? `${post.title.substring(0, 30)}...` : post.title}
          </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {moment(post.date).fromNow()}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description.length > 65 ? `${post.description.substring(0, 65)}...` : post.description}
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
            image={post.image || "https://www.backpackerbanter.com/blog/wp-content/uploads/2018/11/best-places-to-visit-in-sri-lanka-backpacker-travel-sigiriya-kandy-dambulla-elephants-1920x1014.jpg"}
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
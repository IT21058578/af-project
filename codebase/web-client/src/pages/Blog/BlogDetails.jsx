import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, Link } from 'react-router-dom';
import CommentSection from './CommentSection';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar/NavBar';
import TourGuideLink from '../../components/TourGuideLink';
import { useLazyGetPostQuery } from '../../store/api/posts-api-slice';

const BlogDetail = () => {
  // const { post, posts, isLoading } = useSelector((state) => state.posts);
  const [getPost, { data: post, isSuccess: isFetchPostSuccess }] = useLazyGetPostQuery();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  // useEffect(() => {
  //   if (post) {
  //     dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
  //   }
  // }, [post]);

  // if (!post) return null;

  // const openPost = (_id) => history.push(`/posts/${_id}`);

  // if (isLoading) {
  //   return (
  //     <Paper elevation={6}>
  //       <CircularProgress size="7em" />
  //     </Paper>
  //   );
  // }

  // const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  // const post = {
  //   title: 'When can we travel to Sri Lanka in 2022?',
  //   description:
  //     "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents. Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents. Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents. Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents. Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents. Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.   Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.     Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  //   image: 'https://d3k9ljo62xl25w.cloudfront.net/media/images/WhenCanWeTravelTo_SriLanka_22.original.jpg',
  //   imageText: 'main image description',
  //   linkText: 'Continue reading…',
  //   tags: 'tag',
  //   author: 'Jane Doe',
  //   createdAt: 'Jan 12, 2022'
  // };
  
  const recommendedPosts = [
    {
      title: '10 Best Places to Visit in Sri Lanka',
      date: 'Jan 12, 2023',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://www.traveldailymedia.com/assets/2022/10/shutterstock_1046627314.jpg',
      imageLabel: 'Image Text',
    },
    {
      title: '7 Great things to do in Jaffna',
      date: 'Nov 11, 2022',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://www.backpackerbanter.com/blog/wp-content/uploads/2018/11/best-places-to-visit-in-sri-lanka-backpacker-travel-sigiriya-kandy-dambulla-elephants-1920x1014.jpg',
      imageLabel: 'Image Text',
    },
  ];

  return (
    <div>
      <NavBar />
    <Paper style={{ padding: '20px', borderRadius: '15px', width: '90%', marginLeft:'5%', marginBottom: '50px', backgroundColor: 'antiquewhite'}} elevation={6}>
      <div >
        <div >
          <Typography variant="h3" component="h2">{post.title}</Typography>
          {/* <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography> */}
          <Typography gutterBottom variant="body1" component="p">{post.text}</Typography>
          <Typography variant="h6">
            Written by:
            <Link to={`/creators/${post.author}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post.author}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post.date).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <div style={{ display: 'flex' }}>
            <img style={{ width: '50%', maxHeight: '500px', float: 'left', marginRight: '1rem' }} src={post.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
            <Typography variant="body1" style={{ float: 'left' }}>{` ${post.description}`}</Typography>
          </div>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div >
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div >
            {recommendedPosts.map(({ title, name, description, likes, image, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6"><strong>{title}</strong></Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                {/* <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography> */}
                <div style={{ display: 'flex' }}>
                  <img style={{ width: '20%', maxHeight: '500px', float: 'left', marginRight: '1rem' }} src={image} width="200px" />
                  <Typography gutterBottom variant="subtitle2">{description}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
    <TourGuideLink />
    <Footer />
    </div>
  );
};

export default BlogDetail;

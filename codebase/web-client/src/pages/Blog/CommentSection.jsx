import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@mui/material';

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'John Doe',
      comment: 'Great post!',
    },
    {
      id: 2,
      name: 'Harry Kayne',
      comment: 'Thanks for sharing.',
    },
  ]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: comments.length + 1,
      name: name,
      comment: comment,
    };
    setComments([...comments, newComment]);
    setName('');
    setComment('');
  };

  return (
    <Box mt={5}>
      <Typography variant="h5" mb={2}><strong>
        Comments ({comments.length}) </strong>
      </Typography>
      <List sx={{ width: '100%' }}>
        {comments.map((comment) => (
          <ListItem key={comment.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={comment.name} src={`https://picsum.photos/200?random=${comment.id}`} />
            </ListItemAvatar>
            <ListItemText
              primary={comment.name}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {comment.comment}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <Box mt={3}>
          <Typography variant="h6" mb={1}>
            Leave a comment
          </Typography>
          <TextField
            required
            fullWidth
            label="Comment"
            variant="outlined"
            margin="dense"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={1}
          />
          <Button variant="contained" color="primary" type="submit" mt={2}>
            Send
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CommentSection;
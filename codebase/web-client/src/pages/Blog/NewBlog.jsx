import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar/NavBar';
import FileBase from 'react-file-base64';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useSelector } from 'react-redux';
import { useCreatePostMutation, useEditPostMutation } from "../../store/api/posts-api-slice";
// import ReactChipInput from "react-chip-input";

const theme = createTheme();

export default function NewBlog() {

  const user = useSelector((state) => state.user); 

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState('');

  const [createBlog, { isLoading: isCreating }] = useCreatePostMutation();
  const [updateBlog, { isLoading: isUpdating }] = useEditPostMutation();

  const postId = useSelector((state) => (currentId ? state.posts.posts.find((title) => title._id === currentId) : null));

  useEffect(() => {
    // Auto-fill the form data when postId is available (edit mode)
    if (postId) {
      if (!postId?.title) clear();
      if (postId) setPostData(postId);
    }
  }, [postId]);

  const handlePublish = () => {
    if (!user.isLoggedIn) {
      // User is not logged in, handle accordingly (e.g., show error message, redirect to login page)
      return;
    }

    const postData = { title, content, selectedFile };

    if (postId) {
      updateBlog({ id: postId, data: postData });
    } else {
      createBlog(postData);
    }
  };

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper component="form" onSubmit={handlePublish} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, backgroundColor: 'antiquewhite', borderRadius:'20px',  }}>
          <Typography component="h1" variant="h4" align="center">
            Write a Blog
          </Typography><br></br>
            <Grid container spacing={3}>
               
                <Grid item xs={12}>
                <TextField
                    required
                    id="title"
                    name="title"
                    label="Title of the Blog"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <Typography component="h1" variant="h6">
                  Content *
                </Typography>
                <TextareaAutosize 
                    required
                    id="content"
                    name="content"
                    label="Content of the blog"
                    autoComplete="shipping address-line2"
                    variant="standard"
                    multiline minRows={8}
                    sx={{ backgroundColor: 'lightgray', width:'100%' }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                {/* <ChipInput
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onAdd={(chip) => handleAddChip(chip)}
                    onDelete={(chip) => handleDeleteChip(chip)}
                /> */}
                  {/* <ReactChipInput
                    chip-color="grey"
                    classes="class1 class2 chipinput"
                    chips={this.state.chips}
                    onSubmit={(value) => this.handleAddChip(value)}
                    onRemove={(index) => this.handleDeleteChip(index)}
                  /> */}
                </Grid>
                <Grid item xs={12} >
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setSelectedFile({ ...postData, selectedFile: base64 })} />
                </Grid>
                
            </Grid>
            <Button variant="contained" sx={{ mt: 3, ml: 1 }}>Publish</Button>
        </Paper>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
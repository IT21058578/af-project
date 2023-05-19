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
// import ChipInput from 'material-ui-chip-input';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const newBlogSchema = yup.object({
	title: yup.string().required("Please enter the title"),
	text: yup.string().required("Please enter the text"),
});

const theme = createTheme();

export default function NewBlog({ currentId, setCurrentId }) {

  const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm({ resolver: yupResolver(newBlogSchema) });

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', text: '', tags: [], selectedFile: '' });
  };

  const user = useSelector((state) => state.user); 

  const [title, setTitle] = useState('');
  const [text, settext] = useState('');
  const [imageData, setSelectedFile] = useState('');

  const [createBlog, { isLoading }] = useCreatePostMutation();
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

    const tags = ["tags", "tag2"];
    const postData = { title, text, tags: tags, imageData: imageData.toString()};

    try{
      if (postId) {
        updateBlog({ id: postId, data: postData });
      } else {
        createBlog(postData);
        console.log(postData);
      }
    }catch(error){
      console.log(error);
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
        <Paper component="form" onSubmit={handleSubmit(handlePublish)} variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, backgroundColor: 'antiquewhite', borderRadius:'20px',  }}>
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
                    error={errors.title}
                    isLoading={isSubmitting || isLoading}
                    {...register("title")}
                />
                </Grid>
                <Grid item xs={12}>
                <Typography component="h1" variant="h6">
                  text *
                </Typography>
                <TextareaAutosize 
                    required
                    id="text"
                    name="text"
                    label="text of the blog"
                    autoComplete="shipping address-line2"
                    variant="standard"
                    multiline minRows={8}
                    sx={{ backgroundColor: 'lightgray', width:'100%' }}
                    error={errors.text}
                    isLoading={isSubmitting || isLoading}
                    {...register("text")}
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
                </Grid>
                <Grid item xs={12} >
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setSelectedFile({ imageData: base64 })} />
                </Grid>
                
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 3, ml: 1 }}>Publish</Button>
        </Paper>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
import * as React from 'react';
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
import Footer from '../components/Footer';
import NavBar from '../components/NavBar/NavBar';
import FileBase from 'react-file-base64';


const theme = createTheme();

export default function NewBlog() {


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Add New Blog
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
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    id="content"
                    name="content"
                    label="Content of the blog"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="standard"
                    multiline minRows={8}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </Grid>
                
            </Grid>
            <Button variant="contained" sx={{ mt: 3, ml: 1 }}>Submit</Button>
        </Paper>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
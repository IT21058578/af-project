import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { useCreateLocationsMutation } from '../../store/api/location-api-slice';
import Navbar from '../NavBar/NavBar';
import Footer from '../../components/Footer';
import { useSelector } from 'react-redux';
import { states } from './userData';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
  addressLine1: Yup.string().required('Address Line 1 is required'),
  city: Yup.string().required('City is required'),
  province: Yup.string().required('Province is required'),
});

const AddLocationPage = () => {
  const [createLocation, { isLoading, isError }] = useCreateLocationsMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      imageUrl: '',
      address: {
        addressLine1:'',
        addressLine2:'',
        city: '',
        province: '',
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { addressLine2, ...locationData } = values;
      createLocation(locationData)
        .then(() => {
          console.log('Location created successfully');
          navigate('/admin')
        })
        .catch((error) => {
          console.error('Failed to create location:', error);
        });
    },
  });

  const user = useSelector(state => state.auth.user)
  console.log(user)

  return (
    <div>
    <Navbar/>
    <Container maxWidth="md" sx={{marginTop:'60px' , marginBottom:'70px'}}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Location
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                label="Name"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="imageUrl"
                name="imageUrl"
                label="Image URL"
                fullWidth
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                error={formik.touched.imageUrl && formik.errors.imageUrl}
                helperText={formik.touched.imageUrl && formik.errors.imageUrl}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="addressLine1"
                name="addressLine1"
                label="Address Line 1"
                fullWidth
                value={formik.values.addressLine1}
                onChange={formik.handleChange}
                error={formik.touched.addressLine1 && formik.errors.addressLine1}
                helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="addressLine2"
                name="addressLine2"
                label="Address Line 2"
                fullWidth
                value={formik.values.addressLine2}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="city"
                name="city"
                label="City"
                fullWidth
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && formik.errors.city}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="province"
                name="province"
                label="Province"
                fullWidth
                value={formik.values.province}
                onChange={formik.handleChange}
                error={formik.touched.province && formik.errors.province}
                helperText={formik.touched.province && formik.errors.province}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color='success'
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? 'Creating...' : 'Create Location'}
              </Button>
            </Grid>
            {isError && (
              <Grid item xs={12}>
                <Typography color="error">Error creating location.</Typography>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
    <Footer/>
    </div>
  );
};

export default AddLocationPage;


  
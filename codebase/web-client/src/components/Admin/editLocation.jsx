import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLazyGetLocationsQuery, useEditLocationsMutation } from '../../store/api/location-api-slice';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';
import Navbar from '../NavBar/NavBar';
import Footer from '../../components/Footer';

const EditLocationPage = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();

  const [getLocation, { data: locationData, isFetching }] = useLazyGetLocationsQuery();
  const [editLocation] = useEditLocationsMutation();

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');

  useEffect(() => {
    if (locationId) {
      getLocation({ locationId });
    }
  }, [getLocation, locationId]);

  useEffect(() => {
    if (locationData) {
      const { name, imageUrl, address } = locationData;
      setName(name);
      setImageUrl(imageUrl);
      setAddressLine1(address.addressLine1);
      setAddressLine2(address.addressLine2 || '');
      setCity(address.city);
      setProvince(address.province);
    }
  }, [locationData]);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const updatedLocation = {
        id:locationId,
        name,
        imageUrl,
        address: {
          addressLine1,
          addressLine2,
          city,
          province,
        },
      };

      await editLocation({...updatedLocation , locationId}).unwrap();
      navigate('/admin'); // Redirect back to the locations list page
    } catch (error) {
      console.log('Error editing location:', error);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton screen
  }

  return (
    <div>
    <Navbar/>
    <Container maxWidth="md" sx={{marginTop:'60px' , marginBottom:'70px'}}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Location
      </Typography>
      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleEdit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address Line 1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address Line 2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} align="center">
              <Button type="submit" variant="contained" color="success">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    <Footer/>
    </div>
  );
};

export default EditLocationPage;

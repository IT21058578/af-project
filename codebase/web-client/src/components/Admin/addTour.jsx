import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateTripPackgeMutation } from '../../store/api/package-api-slice';
import { TextField, Button, Container, Typography, Grid, Paper } from '@mui/material';
import Navbar from '../NavBar/NavBar';
import Footer from '../../components/Footer';

const AddTripPackage = () => {
  const history = useNavigate();
  const [createTripPackage] = useCreateTripPackgeMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createdById, setCreatedById] = useState('');
  const [totalDistance, setTotalDistance] = useState(0);
  const [imageURLs, setImageURLs] = useState([]);
  const [price, setPrice] = useState({
    perPerson: 0,
    transport: {
      group: 0,
      van: 0,
      car: 0,
    },
    lodging: {
      threeStar: 0,
      fourStar: 0,
      fiveStar: 0,
    },
    perPersonFood: 0,
  });
  const [discount, setDiscount] = useState({
    type: '',
    value: 0,
  });
  const [plan, setPlan] = useState([
    {
      locationId: '',
      activities: [],
    },
  ]);
  const [limitedDateRange, setLimitedDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [views, setViews] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      // Perform any necessary validation on input fields

      const newTripPackage = {
        name,
        description,
        createdById,
        totalDistance,
        imageURLs,
        price,
        discount,
        plan,
        limitedDateRange,
        views,
        isFeatured,
      };

      await createTripPackage(newTripPackage).unwrap();
      // Perform any other necessary tasks upon successful creation
      history.push('/'); // Redirect back to the trip package list page
    } catch (error) {
      console.log('Error adding trip package:', error);
    }
  };

  return (
    <div>
    <Navbar/>
    <Container maxWidth="md" sx={{marginTop:'60px' , marginBottom:'70px'}}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Trip Package
      </Typography>
      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleAdd}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Created By"
                value={createdById}
                onChange={(e) => setCreatedById(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Total Distance"
                type="number"
                value={totalDistance}
                onChange={(e) => setTotalDistance(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URLs"
                value={imageURLs.join(', ')}
                onChange={(e) => setImageURLs(e.target.value.split(', '))}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price per Person"
                type="number"
                value={price.perPerson}
                onChange={(e) =>
                  setPrice((prevPrice) => ({ ...prevPrice, perPerson: e.target.value }))
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Group Transport Price"
                type="number"
                value={price.transport.group}
                onChange={(e) =>
                  setPrice((prevPrice) => ({
                    ...prevPrice,
                    transport: { ...prevPrice.transport, group: e.target.value },
                  }))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Van Transport Price"
                type="number"
                value={price.transport.van}
                onChange={(e) =>
                  setPrice((prevPrice) => ({
                    ...prevPrice,
                    transport: { ...prevPrice.transport, van: e.target.value },
                  }))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Car Transport Price"
                type="number"
                value={price.transport.car}
                onChange={(e) =>
                  setPrice((prevPrice) => ({
                    ...prevPrice,
                    transport: { ...prevPrice.transport, car: e.target.value },
                  }))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Three Star Lodging Price"
                type="number"
                value={price.lodging.threeStar}
                onChange={(e) =>
                  setPrice((prevPrice) => ({
                    ...prevPrice,
                    lodging: { ...prevPrice.lodging, threeStar: e.target.value },
                  }))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Four Star Lodging Price"
                type="number"
                value={price.lodging.fourStar}
                onChange={(e) =>
                  setPrice((prevPrice) => ({
                    ...prevPrice,
                    lodging: { ...prevPrice.lodging, fourStar: e.target.value },
                  }))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Five Star Lodging Price"
                type="number"
                value={price.lodging.fiveStar}
                onChange={(e) =>
                  setPrice((prevPrice) => ({
                    ...prevPrice,
                    lodging: { ...prevPrice.lodging, fiveStar: e.target.value },
                  }))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Per Person Food Price"
                type="number"
                value={price.perPersonFood}
                onChange={(e) =>
                  setPrice((prevPrice) => ({ ...prevPrice, perPersonFood: e.target.value }))
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Discount Type"
                value={discount.type}
                onChange={(e) => setDiscount((prevDiscount) => ({ ...prevDiscount, type: e.target.value }))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Discount Value"
                type="number"
                value={discount.value}
                onChange={(e) => setDiscount((prevDiscount) => ({ ...prevDiscount, value: e.target.value }))}
                fullWidth
              />
            </Grid>
            {/* Add TextField components for the remaining fields */}
            <Grid item xs={12} align="center">
              <Button type="submit" variant="contained" color="primary">
                Add Trip Package
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

export default AddTripPackage;

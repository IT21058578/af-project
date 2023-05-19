import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const people = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
  {
    value: '6',
    label: '6',
  },
  {
    value: '7',
    label: '7',
  },
  {
    value: '8',
    label: '8',
  },
];

const vehicle = [
  {
    value: 'group',
    label: 'group',
  },
  {
    value: 'car',
    label: 'car',
  },
  {
    value: 'van',
    label: 'van',
  },
];

const hotel = [
  {
    value: '3 star',
    label: '3 star',
  },
  {
    value: '4 star',
    label: '4 star',
  },
  {
    value: '5 star',
    label: '5 star',
  },
];

export default function Total({ tripPackage }) {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState('1');
  const [selectedVehicle, setSelectedVehicle] = useState('group');
  const [selectedHotel, setSelectedHotel] = useState('3 star');
  const [totalCharge, setTotalCharge] = useState(0);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePeopleChange = (event) => {
    setSelectedPeople(event.target.value);
  };

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const handleHotelChange = (event) => {
    setSelectedHotel(event.target.value);
  };

  const calculateTotal = () => {
    const lodgingPrice =tripPackage?.price?.lodging[selectedHotel] || 0;
    const perPersonPrice = tripPackage?.price?.perPerson || 0;
    const perPersonFoodPrice = tripPackage?.price?.perPersonFood || 0;
    const transportPrice =tripPackage?.price?.transport[selectedVehicle] || 0;

    const total =
      lodgingPrice * parseInt(selectedPeople) +
      perPersonPrice * parseInt(selectedPeople) +
      perPersonFoodPrice * parseInt(selectedPeople) +
      transportPrice +
      (selectedHotel !== '3 star'
        ? perPersonFoodPrice * parseInt(selectedPeople)
        : 0);

    setTotalCharge(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedPeople, selectedVehicle, selectedHotel]);

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        marginTop: '70px',
        marginLeft: '20px',
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Persons"
          value={selectedPeople}
          onChange={handlePeopleChange}
          helperText="Please select people count"
        >
          {people.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <div>
          <FormControlLabel
            required
            control={
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
            }
            label="Are you planning to travel alone? (With your family or friends)"
            sx={{ color: '#394867', marginLeft: '10px' }}
          />
          <br />
          {isChecked && (
            <TextField
              id="outlined-select-currency-native"
              select
              label="Select your vehicle"
              value={selectedVehicle}
              onChange={handleVehicleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Please select the vehicle type"
            >
              {vehicle.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          )}
        </div>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: '650px',
              height: '300px',
            },
          }}
        >
          <Paper sx={{ padding: '20px' }}>
            <h5 style={{ color: '#146C94' }}>3 Start Hotels</h5>
            <p style={{ fontSize: '12px', color: 'red' }}>
              All the room and other accommodation facilities are added to the
              package. Foods and beverages are not included; you can get them
              from the hotel or outside.
            </p>
            <h5 style={{ color: '#146C94' }}>4 Start Hotels</h5>
            <p style={{ fontSize: '12px', color: 'red' }}>
              All the room and other accommodation facilities are added to the
              package. Foods and beverages are included.
            </p>
            <h5 style={{ color: '#146C94' }}>5 Start Hotels</h5>
            <p style={{ fontSize: '12px', color: 'red' }}>
              All the room and other accommodation facilities are added to the
              package. Foods and beverages are included.
            </p>
          </Paper>
        </Box>

        <TextField
          id="outlined-select-currency-native"
          select
          label="Hotel type"
          value={selectedHotel}
          onChange={handleHotelChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select hotel type you need"
        >
          {hotel.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <p style={{ color: 'green', marginLeft: '5px' }}>
          Total Charge: {totalCharge}$
        </p>
      </div>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginLeft: '5px' }}
        onClick={calculateTotal}
      >
        Make the Booking
      </Button>
    </Box>
  );
}

import React, { useState } from 'react';
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

export default function Total() {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        marginTop:"70px",
        marginLeft:"20px"
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Persons"
          defaultValue="1"
          helperText="Please select people count"
        >
          {people.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField><br/>
        <div>
        <FormControlLabel
            required
            control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
            label="Are you planning to travel alone? (With your family or friends)"
            sx={{ color: '#394867', marginLeft: '10px' }}
        />
        <br />

        {isChecked && 
        <TextField
        id="outlined-select-currency-native"
        select
        label="Select your vehicle"
        defaultValue="car"
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
        }
        </div>

        <Box
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
            m: 1,
            width: "650px",
            height: "300px",
            },
        }}
        >
        <Paper sx={{padding:'20px'}}> 
            <h5 style={{color:'#146C94'}}>3 Start Hotels</h5>
            <p style={{fontSize:'12px' , color:'red'}}>All the room and other accamadation facilities are added to the package. Foods and bevarages are not included you can get them from thr hitel or out side.</p>
            <h5 style={{color:'#146C94'}}>4 Start Hotels</h5>
            <p style={{fontSize:'12px' , color:'red'}}>All the room and other accamadation facilities are added to the package. Foods and bevarages are included.</p>
            <h5 style={{color:'#146C94'}}>5 Start Hotels</h5>
            <p style={{fontSize:'12px' , color:'red'}}>All the room and other accamadation facilities are added to the package. Foods and bevarages are included.</p>
        </Paper>
        </Box>

        <TextField
          id="outlined-select-currency-native"
          select
          label="Hotel type"
          defaultValue="3 star"
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
        <p style={{color:'green',marginLeft:'5px'}}>Total Charge: 1700$</p>
      </div>
      <Button variant="contained" color="primary" sx={{marginLeft:'5px'}}>
        Make the Booking
      </Button>
     
    </Box>
  );
}
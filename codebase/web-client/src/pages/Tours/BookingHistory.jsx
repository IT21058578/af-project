import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer';

function createData(packageName, date, persons, vehicle, price) {
  return { packageName, date, persons, vehicle, price };
}

const rows = [
  createData('Yala', '2023.05.04', '6', 'Van', '21000'),
  createData('Mirissa', '2023.05.07', '6', 'Van', '19000'),
  createData('Kandy', '2022.05.07', '6', 'Van', '29000'),

];

export default function UserOrder() {
  return (
    <div>
    <Navbar/>
    <h3 style={{marginLeft:'10%'}}>Bookig history</h3>
    <TableContainer component={Paper} sx={{width:'80%', marginLeft:'10%', marginBottom:'50px', backgroundColor:'antiquewhite'}}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold'}}>Booked Package</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Date</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Persons</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Vehicle</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Price (LKR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.packageName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.packageName}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.persons}</TableCell>
              <TableCell align="right">{row.vehicle}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Footer />
    </div>
  );
}
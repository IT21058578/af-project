import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../../components/NavBar/NavBar';

function createData(packageName, date, persons, vehicle, price) {
  return { packageName, date, persons, vehicle, price };
}

const rows = [
  createData('Yala', '2023.05.04', '6', 'Van', '2100'),
  createData('Mirissa', '2023.05.07', '6', 'Van', '1900'),
];

export default function UserOrder() {
  return (
    <div>
    <Navbar/>
    <h3>Bookig history</h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Booked Package</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Persons</TableCell>
            <TableCell align="right">Vehicle</TableCell>
            <TableCell align="right">Price</TableCell>
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
    </div>
  );
}
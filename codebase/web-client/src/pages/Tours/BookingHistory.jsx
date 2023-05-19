import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';
import { useLazySearchBookingsQuery } from '../../store/api/booking-api-slice';
import './loading.css';

const columns = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    align: 'left',
  },
  {
    accessorKey: 'package.lodging',
    header: 'Hotel',
    align: 'left',
  },
  {
    accessorKey: 'package.transport',
    header: 'Vehicle',
    align: 'left',
  },
  {
    accessorKey: 'createdById',
    header: 'User ID',
    align: 'left',
  },
];

const csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

export default function UserOrder() {
  const [fetchOrders, { data: bookings, isLoading, isError, error }] =
    useLazySearchBookingsQuery();

  useEffect(() => {
    fetchOrders({});
  }, [fetchOrders]);

  if (isLoading) {
    return (
      <div>
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleExportData = () => {
    csvExporter.generateCsv(bookings?.content);
  };

  return (
    <div>
      <Navbar />
      <h3 style={{ marginLeft: '10%' }}>Booking history</h3>

      <Button
          color="primary"
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
          sx={{marginLeft:'150px' , background:'green' , marginBottom:'10px'}}
          variant="contained"
        >
          Export All Data
        </Button>

      <TableContainer
        component={Paper}
        sx={{
          width: '80%',
          marginLeft: '10%',
          marginBottom: '50px',
          backgroundColor: 'antiquewhite',
        }}
      >
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.accessorKey}
                  sx={{ fontWeight: 'bold' }}
                  align={column.align || 'left'}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings?.content?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.accessorKey}
                    align={column.align || 'left'}
                  >
                    { column.accessorKey === 'createdAt' ? (
                      <TableCell align="right">{row.createdAt}</TableCell>
                    ) : column.accessorKey === 'package.lodging' ? (
                      <TableCell align="right">{row.package.lodging}</TableCell>
                    ) : column.accessorKey === 'package.transport' ? (
                      <TableCell align="right">{row.package.transport}</TableCell>
                    ) : column.accessorKey === 'createdById' ? (
                      <TableCell align="right">{row.createdById}</TableCell>
                    ) : (
                      row[column.accessorKey]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
      </Box>
      <Footer />
    </div>
  );
}

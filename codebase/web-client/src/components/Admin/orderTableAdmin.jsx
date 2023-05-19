import React,{useEffect} from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import { useLazySearchBookingsQuery } from '../../store/api/booking-api-slice';
import '../../pages/Tours/loading.css'

//defining columns outside of the component is fine, is stable
const columns = [
      {
        accessorKey: 'customerName',
        header: 'Customer Name',
        size: 150,
      },
      {
        accessorKey: 'packageName',
        header: 'Middle Name',
        size: 170,
      },
      {
        accessorKey: 'bookingDate',
        header: 'Booking Date',
        size: 150,
      },
      {
        accessorKey: 'persons',
        header: 'Persons',
        size: 150,
      },
      {
        accessorKey: 'tourType',
        header: 'Tour Type',
        size: 150,
      },
      {
        accessorKey: 'vehicle',
        header: 'Vehicle',
        size: 150,
      },
      {
        accessorKey: 'hotelType',
        header: 'Hotel Type',
      },
      {
        accessorKey: 'totalPayment',
        header: 'Total Payment',
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

const AdminOrder = () => {

  // const [fetchOrders , {data: bookings , isLoading , isError , error }] = useLazySearchBookingsQuery();

  // useEffect(() => {
  //   fetchOrders({});
  // }, [fetchOrders]);

  // if(isLoading){
  //   return <div>
  //     <div className="loader-container">
  //     	  <div className="spinner"></div>
  //     </div>
  //   </div>
  // }

  // if(isError){
  //   return<div>Error: {error.message}</div>
  // }

  // const handleExportRows = (rows) => {
  //   csvExporter.generateCsv(rows.map((row) => row.original));
  // };

  // const handleExportData = () => {
  //   csvExporter.generateCsv(bookings?.content);
  // };

  // return (
    
  //   <MaterialReactTable
  //     columns={columns}
  //     data={bookings?.content}
  //     enableRowSelection
  //     positionToolbarAlertBanner="bottom"
  //     renderTopToolbarCustomActions={({ table }) => (
  //       <Box
  //         sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
  //       >
  //         <Button
  //           color="primary"
  //           onClick={handleExportData}
  //           startIcon={<FileDownloadIcon />}
  //           variant="contained"
  //         >
  //           Export All Data
  //         </Button>
  //         <Button
  //           disabled={table.getPrePaginationRowModel().rows.length === 0}
  //           onClick={() =>
  //             handleExportRows(table.getPrePaginationRowModel().rows)
  //           }
  //           startIcon={<FileDownloadIcon />}
  //           variant="contained"
  //         >
  //           Export All Rows
  //         </Button>
  //         <Button
  //           disabled={table.getRowModel().rows.length === 0}
  //           onClick={() => handleExportRows(table.getRowModel().rows)}
  //           startIcon={<FileDownloadIcon />}
  //           variant="contained"
  //         >
  //           Export Page Rows
  //         </Button>
  //         <Button
  //           disabled={
  //             !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
  //           }
  //           onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
  //           startIcon={<FileDownloadIcon />}
  //           variant="contained"
  //         >
  //           Export Selected Rows
  //         </Button>
  //       </Box>
  //     )}
  //   />
  // );
};

export default AdminOrder;




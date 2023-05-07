import React, { useEffect, useMemo, useRef, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { makeData } from './makeData1';

const AdminOrder = () => {
  const columns = useMemo(
    //column definitions...
    () => [
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
        size: 300,
      },
      {
        accessorKey: 'tourType',
        header: 'Tour Type',
        size: 250,
      },
      {
        accessorKey: 'vehicle',
        header: 'Vehicle',
        size: 300,
      },
      {
        accessorKey: 'hotelType',
        header: 'Hotel Type',
      },
      {
        accessorKey: 'totalPayment',
        header: 'Total Payment',
      },
    ],
    [],
    //end
  );

  //optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef = useRef(null);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData(makeData(10_000));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  return (
    <MaterialReactTable
      columns={columns}
      data={data} //10,000 rows
      enableBottomToolbar={false}
      enableColumnResizing
      enableColumnVirtualization
      enableGlobalFilterModes
      enablePagination={false}
      enablePinning
      enableRowNumbers
      enableRowVirtualization
      muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
      onSortingChange={setSorting}
      state={{ isLoading, sorting }}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //optional
      rowVirtualizerProps={{ overscan: 5 }} //optionally customize the row virtualizer
      columnVirtualizerProps={{ overscan: 2 }} //optionally customize the column virtualizer
    />
  );
};

export default AdminOrder;

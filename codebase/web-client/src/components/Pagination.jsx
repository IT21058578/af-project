import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paginate() {
  return (
    <Stack spacing={2}>
      <Pagination
        count={10}
        sx={{
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '30px',
        }}
      />
    </Stack>
  );
}

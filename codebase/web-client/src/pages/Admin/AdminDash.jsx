import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { OverviewBudget } from '../../components/Admin/BuggetComponents';
import { OverviewTasksProgress } from '../../components/Admin/tasks-progress';
import { OverviewTotalProfit } from '../../components/Admin/total-profit';
import { OverviewTotalCustomers } from '../../components/Admin/TotalCustomers';
import AdminOrder from '../../components/Admin/orderTableAdmin';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  return (
    <div>   
      <Box sx={{ flexGrow: 1 , margin:"60px"}}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <OverviewBudget/>
        </Grid>
        <Grid item xs={3}>
          <OverviewTotalCustomers/>
        </Grid>
        <Grid item xs={3}>
          <OverviewTasksProgress/>
        </Grid>
        <Grid item xs={3}>
         <OverviewTotalProfit/>
        </Grid>
        <Grid item xs={12}>
         <h3 style={{alignItems:'center' , marginTop:'40px' , marginLeft:'30px' , color:'red'}}>Booking Details</h3>
        </Grid>
        <Grid item xs={12}>
         <AdminOrder/>
        </Grid>
      </Grid>
    </Box>
  </div>

  );
}


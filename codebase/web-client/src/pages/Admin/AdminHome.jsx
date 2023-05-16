import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dashboard from './AdminDash';
import PackageManagment from '../../components/Admin/packageManagment';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer';
import UserManagment from '../../components/Admin/userManagment';
import EmployeeManagment from '../../components/Admin/employeeManagment';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AdminHome() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>   
   <Navbar/>
    <Box sx={{ width: '100%', marginTop:'30px'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="DashBoard" {...a11yProps(0)} />
          <Tab label="User Managment" {...a11yProps(1)} />
          <Tab label="Authors Managment" {...a11yProps(2)} />
          <Tab label="Tour Managment" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Dashboard/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UserManagment/>
      </TabPanel>
      <TabPanel value={value} index={2}>
       <EmployeeManagment/>
      </TabPanel>
      <TabPanel value={value} index={3}>
       <PackageManagment/>
      </TabPanel>
    </Box>
    <Footer />
    </div>
  );
}
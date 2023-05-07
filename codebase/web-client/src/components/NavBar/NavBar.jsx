import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import logoCH from '../../assets/logoCH.png';
// import * as actionType from '../../constants/actionTypes';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
import Image from '../../assets/navBg.png';


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const history = useHistory();

  // const logout = () => {
  //   dispatch({ type: actionType.LOGOUT });

  //   // history.push('/auth');

  //   setUser(null);
  // };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  // return (
  //   <AppBar className="appBar" position="static" color="inherit">
  //     <Link to="/" className="brandContainer">
  //       <img component={Link} to="/" src={logoCH} alt="icon" height="50px" />
  //     </Link>
  //     <Toolbar className="toolbar">
  //       {user?.result ? (
  //         <div className="profile">
  //           <Avatar className="purple" alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
  //           <Typography className="userName" variant="h6">{user?.result.name}</Typography>
  //           <Button variant="contained" className="logout" color="secondary" onClick={logout}>Logout</Button>
  //         </div>
  //       ) : (
  //         <Button component={Link} to="/auth" variant="contained" color="inherit">Sign In</Button>
  //       )}
  //     </Toolbar>
  //   </AppBar>
  // );

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent !important', backgroundImage:`url(${Image})`, backgroundSize:'cover',backgroundRepeat:'no-repeat', opacity:"1.0", color:'black' , padding:'30px', minHeight:'480px' , boxShadow:'none'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters >
        <Link to="/Blogs" className="brandContainer">
        <img component={Link} to="/Blogs" src={logoCH} alt="icon" height="50px" />
        </Link>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="inherit" sx={{color:'white'}} onClick={() => navigate("/Blogs")}>
                Blog
              </Button>
              <Button variant="outlined" color="inherit" sx={{color:'white'}} onClick={() => navigate("/tour")}>
                Packages
              </Button>
              <Button variant="outlined" color="inherit" sx={{color:'white'}} onClick={() => navigate("/admin")}>
                Admin Dash
              </Button>
            </Stack>
          </Box>

          <Box sx={{ flexGrow: 0 }}> 
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;

import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

// import feastlyText from '../../images/feastlyText.png';
import logoCH from '../../assets/logoCH.png';
// import * as actionType from '../../constants/actionTypes';
import './styles.css';

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

  return (
    <AppBar className="appBar" position="static" color="inherit">
      <Link to="/" className="brandContainer">
        <img component={Link} to="/" src={logoCH} alt="icon" height="50px" />
      </Link>
      <Toolbar className="toolbar">
        {user?.result ? (
          <div className="profile">
            <Avatar className="purple" alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className="userName" variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className="logout" color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="inherit">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

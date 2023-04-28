import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

import logoCH from '../assets/logoCH.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Culture Hub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        Height: '100vh',
        marginBottom: 0,
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
            display: 'flex',
            flexDirection: 'row',
            color: '#ffe4c4',
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <img src={logoCH} alt="icon" height="40px" />
        <Container maxWidth="sm">
          <Typography variant="body1">
            <Link color="inherit" href="https://mui.com/">
                Tour Guide
            </Link>&nbsp;&nbsp;
            <Link color="inherit" href="https://mui.com/">
                Blog
            </Link>&nbsp;&nbsp;
            <Link color="inherit" href="https://mui.com/">
                Terms of Use
            </Link>&nbsp;&nbsp;
            <Link color="inherit" href="https://mui.com/">
                Privacy Policy
            </Link>
          </Typography>
          <Copyright />
        </Container>
        <TwitterIcon />&nbsp;&nbsp;
        <FacebookIcon />&nbsp;&nbsp;
        <InstagramIcon />&nbsp;&nbsp;
        <PinterestIcon />&nbsp;&nbsp;
      </Box>
    </Box>
  );
}
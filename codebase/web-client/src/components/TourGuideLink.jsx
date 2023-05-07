import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Icon from '../assets/tourIcon.png';

const TourGuideLink = () => {
  return (
    <div style={{ marginTop: '50px'}}>
      <Typography variant="h4" component="h2" align="center" sx={{ fontFamily: 'Tahoma', fontWeight: 'bold' }} gutterBottom>
        Did you know?
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
      We provide Tour Guide packages, consectetur adipiscing elit. Sed nec mi vitae magna bibendum facilisis.
      </Typography>
      <Card sx={{ maxWidth: 100, align: 'center', marginLeft: '46%', marginTop: '10px', marginBottom: '50px' }}>
        <CardActionArea component={Link} to="/tour">
          <CardMedia
            component="img"
            image={Icon}
            alt="Image 1"
            sx={{ width: '100px'}}
          />
          <Typography variant="caption" align="center" gutterBottom>
            Click Here
          </Typography>
        </CardActionArea>
      </Card>
      {/* <Card sx={{ maxWidth: 345 }}>
        <CardActionArea component={Link} to="/page2">
          <CardMedia
            component="img"
            height="140"
            image="/path/to/image2.jpg"
            alt="Image 2"
          />
        </CardActionArea>
      </Card> */}
    </div>
  );
};

export default TourGuideLink;

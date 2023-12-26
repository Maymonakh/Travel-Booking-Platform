import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
} from '@mui/material';
import { AvaliableRoomsResponse } from '../../../API/Hotel/types';



const AvailableRoomsCard = ({ data }: { data: AvaliableRoomsResponse }) => {

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={data.roomPhotoUrl}
        alt={data.roomType}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {data.roomType}
        </Typography>
        <Typography color="textSecondary">
          {`Capacity: ${data.capacityOfAdults} Adults, ${data.capacityOfChildren} Children`}
        </Typography>
        <Typography color="textSecondary">
          {`Price: $${data.price}`}
        </Typography>
        <Typography color="textSecondary">
          {`Availability: ${data.availability ? 'Available' : 'Not Available'}`}
        </Typography>

        <Grid container spacing={1} marginTop={2}>
          {data.roomAmenities.map((amenity, index) => (
            <Grid item key={index}>
              <Chip label={amenity.name} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AvailableRoomsCard;

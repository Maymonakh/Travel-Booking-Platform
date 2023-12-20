import React from "react";
import Rating from "@mui/material/Rating";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FeaturesDealsResponse } from "../../../../API/Home/types";

const FeaturesDealsCard = ({ data }: { data: FeaturesDealsResponse }) => {
  const {
    roomPhotoUrl,
    hotelName,
    hotelStarRating,
    cityName,
    finalPrice,
    originalRoomPrice,
    discount,
    title,
  } = data;

  return (
    <Card>
      <CardMedia
        component="img"
        alt={hotelName}
        height="140"
        image={roomPhotoUrl}
      />
      <CardContent>
        <div>
          <Typography variant="h6">{cityName}</Typography>
          <Typography variant="subtitle1">{hotelName}</Typography>
          <Typography variant="body2">{title}</Typography>
        </div>
        <div>
          <Rating name="read-only" value={hotelStarRating} readOnly />
          <Typography variant="body2">
            Before: <del>{originalRoomPrice}$</del>
          </Typography>
          <Typography variant="body2">Discount: {discount * 100}%</Typography>
          <Typography variant="h6">
            Final price: <span>{finalPrice}$</span>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesDealsCard;

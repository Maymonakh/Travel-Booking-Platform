import React from "react";
import Rating from "@mui/material/Rating";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FeaturesDealsResponse } from "../../../../API/Home/types";

const FeaturesDealsCard = ({ data }: { data: FeaturesDealsResponse }) => {
  return (
    <Card >
      <CardMedia
        component="img"
        alt={data.hotelName}
        height="160"
        image={data.roomPhotoUrl}
      />
      <CardContent>
        <div>
          <Typography variant="h6">{data.cityName}</Typography>
          <Typography variant="subtitle1">{data.hotelName}</Typography>
        </div>
        <div>
          <Rating name="read-only" value={data.hotelStarRating} readOnly />
          <Typography variant="body2">
            Before: <del>{data.originalRoomPrice}$</del>
          </Typography>
          <Typography variant="body2">
            Discount: {data.discount * 100}%
          </Typography>
          <Typography variant="h6">
            Final price: <span>{data.finalPrice}$</span>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesDealsCard;

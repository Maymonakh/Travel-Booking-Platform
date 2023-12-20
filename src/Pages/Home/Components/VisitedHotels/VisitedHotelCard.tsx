import React from "react";
import Rating from "@mui/material/Rating";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { VisitedHotelsResponse } from "../../../../API/Home/types";

const VisitedHotelsCard = ({ data }: { data: VisitedHotelsResponse }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={data.cityName}
        height="140"
        image={data.thumbnailUrl}
      />
      <CardContent>
        <div>
          <Typography variant="subtitle1">{data.cityName}</Typography>
          <Rating name="read-only" value={data.starRating} readOnly />
        </div>
        <Typography variant="body1">{data.hotelName}</Typography>
        <Typography variant="body2">{data.visitDate.split("T")[0]}</Typography>
      </CardContent>
    </Card>
  );
};

export default VisitedHotelsCard;

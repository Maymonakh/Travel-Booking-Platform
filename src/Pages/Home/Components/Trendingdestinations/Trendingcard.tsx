import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { TrendingDestinationResponse } from "../../../../API/Home/types";

const Trendingcard = ({ data }: { data: TrendingDestinationResponse }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        alt={data.cityName}
        height="150"
        image={data.thumbnailUrl}
      />
      <CardContent>
        <Typography variant="h6">{data.countryName}</Typography>
        <Typography variant="subtitle1">{data.cityName}</Typography>
      </CardContent>
    </Card>
  );
};

export default Trendingcard;

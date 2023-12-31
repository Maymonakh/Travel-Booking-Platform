import React from "react";
import Rating from "@mui/material/Rating";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { SearchResponse } from "../../../../API/Search/types";
import { useNavigate } from "react-router-dom";

const SearchedHotelsCard = ({ data }: { data: SearchResponse }) => {
  const navigate = useNavigate();

  const handleHotelNameClick = () => {
    navigate("/Hotel", { state: { results: data.hotelId} });
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        alt={`Hotel: ${data.hotelName}`}
        height="140"
        image={data.roomPhotoUrl}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "row", gap: 7, maxHeight: 80 }}
      >
        <Grid>
          <Typography variant="h6" gutterBottom onClick={handleHotelNameClick}>
            {data.hotelName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {data.cityName}
          </Typography>{" "}
          <Typography variant="subtitle1" gutterBottom>
            Room Price: ${data.roomPrice}
          </Typography>
        </Grid>
        <Grid>
          <Rating name="read-only" value={data.starRating} readOnly />
          <Typography variant="subtitle1" gutterBottom>
            Discount: {data.discount}%
          </Typography>
        </Grid>
        <Grid sx={{ display: "flex", alignItems: "flex-end", marginLeft: 10 }}>
          <Button variant="contained" color="primary" size="small">
            Add to Cart
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SearchedHotelsCard;

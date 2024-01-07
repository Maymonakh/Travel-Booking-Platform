import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  SearchRequestProps,
  SearchResponse,
} from "../../../../API/Search/types";
import SearchedHotelsCard from "./SearchedHotelCard";

const SearchedHotels = () => {
  const location = useLocation();
  const searchResults = location.state?.results || [];

  return (
    <Container
      sx={{
        backgroundColor: "white",
        paddingTop: 5,
        paddingBottom: 2,
        borderRadius: 5,
      }}
    >
      <Typography variant="h5" gutterBottom marginBottom={3}>
        Hotels you might like:
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        sx={{
          maxHeight: 800,
          overflowX:"auto",
          padding: 3,
        }}
      >
        {searchResults.length === 0 ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom marginBottom={3}>
            No Hotels searched.
            </Typography>
          </Grid>
        ) : (
          searchResults.map((hotel: SearchResponse, index: number) => (
            <Grid item key={index} xs={12}>
              <SearchedHotelsCard data={hotel} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default SearchedHotels;

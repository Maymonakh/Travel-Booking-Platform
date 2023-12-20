import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, Typography, Grid } from "@mui/material";
import Trendingcard from "./Trendingcard";
import { trendingDestinationsRequest } from "../../../../API/Home";
import { TrendingDestinationResponse } from "../../../../API/Home/types";

const Trendingdestination = () => {
  const [DestinationsData, setDestinationsData] = useState<
    TrendingDestinationResponse[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await trendingDestinationsRequest();
        setDestinationsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: 5,
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom sx={{ margin: 2 }}>
        Trending Destinations
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        sx={{
          maxHeight: 825,
          overflowY: "scroll",
          paddingInline: 2,
        }}
      >
        {DestinationsData.length === 0 ? (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          DestinationsData.map((destination, index) => (
            <Grid item key={index} xs={12}>
              <Trendingcard data={destination} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Trendingdestination;

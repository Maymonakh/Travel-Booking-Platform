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
        padding: 5,
        paddingBottom:10,
        borderRadius: 5,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom sx={{ margin: 2 }}>
        Trending Destinations
      </Typography>
        {DestinationsData.length === 0 ? (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          DestinationsData.map((destination, index) => (
            index !== 0 && (
              <Grid item key={index} xs={12}>
                <Trendingcard data={destination} />
              </Grid>
            )
          ))
          
        )}
    </Container>
  );
};

export default Trendingdestination;

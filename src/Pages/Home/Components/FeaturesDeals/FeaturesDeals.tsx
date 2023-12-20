import React, { useState, useEffect } from "react";
import { Grid, Typography, Container, CircularProgress } from "@mui/material";
import FeaturesDealsCard from "./FeaturesDealsCard";
import { featuresDealsRequest } from "../../../../API/Home";
import { FeaturesDealsResponse } from "../../../../API/Home/types";

const FeaturesDeals = () => {
  const [featuresDealsData, setFeaturesDealsData] = useState<
    FeaturesDealsResponse[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await featuresDealsRequest();
        setFeaturesDealsData(response.data);
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
        paddingTop: 5,
        paddingBottom: 2,
        borderRadius: 5,
      }}
    >
      <Grid item xs={12} marginBottom={3}>
        <Typography variant="h5">Featured Deals:</Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="column"
        sx={{
          maxHeight: 500,
          overflowX: "scroll",
          paddingBottom: 3,
        }}
      >
        {featuresDealsData.length === 0 ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          featuresDealsData.map((hotel, index) => (
            <Grid item key={index} xs={12} lg={4}>
              <FeaturesDealsCard data={hotel} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default FeaturesDeals;

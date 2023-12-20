import React, { useEffect, useState } from "react";
import VisitedHotelsCard from "./VisitedHotelCard";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { VisitedHotelsResponse } from "../../../../API/Home/types";
import { visitedHotelsRequest } from "../../../../API/Home";

const VisitedHotels = () => {
  const [visitedHotels, setVisitedHotels] = useState<VisitedHotelsResponse[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await visitedHotelsRequest(token);
        setVisitedHotels(response.data);
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
        marginTop: 1.5,
        paddingTop: 5,
        paddingBottom:2,
        borderRadius: 5,
      }}
    >
      <Typography variant="h5" gutterBottom marginBottom={3}>
        Recent Visited Hotels:
      </Typography>
      <Grid container spacing={2} direction="column" sx={{
        maxHeight:500,
        overflowX:"scroll",
        paddingBottom:3,
      }}>
        {visitedHotels.length === 0 ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          visitedHotels.map((hotel, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <VisitedHotelsCard data={hotel} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default VisitedHotels;

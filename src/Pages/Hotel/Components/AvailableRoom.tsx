import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import { AvaliableRoomsResponse } from "../../../API/Hotel/types";
import { AvailableRoomsRequest } from "../../../API/Hotel";
import AvailableRoomsCard from "./AvailableRoomsCard";

const AvailableRooms = () => {
  const [availableRoomsData, setAvailableRoomsData] = useState<
    AvaliableRoomsResponse[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AvailableRoomsRequest();
        setAvailableRoomsData(response.data);
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
        marginTop: 2,
        paddingTop: 5,
        paddingBottom: 2,
        borderRadius: 5,
      }}
    >
      <Grid item xs={12} marginBottom={3}>
        <Typography variant="h5">Available Rooms:</Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="column"
        sx={{
          maxHeight: 400,
          overflowX: "scroll",
          paddingBottom: 3,
        }}
      >
        {availableRoomsData.length === 0 ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
            availableRoomsData.map((hotel, index) => (
            <Grid item key={index} xs={12} lg={4}>
              <AvailableRoomsCard data={hotel} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default AvailableRooms;

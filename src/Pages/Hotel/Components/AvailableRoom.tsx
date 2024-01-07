import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
  Button,
} from "@mui/material";
import { AvaliableRoomsResponse } from "../../../API/Hotel/types";
import { AvailableRoomsRequest } from "../../../API/Hotel";
import AvailableRoomsCard from "./AvailableRoomsCard";
import { useLocation, useNavigate } from "react-router-dom";

const AvailableRooms = () => {
  const location = useLocation();
  const hotel = location.state?.results || [];
  const navigate = useNavigate();

  const [selectedRooms, setSelectedRooms] = useState<AvaliableRoomsResponse[]>([]);
  const [availableRoomsData, setAvailableRoomsData] = useState<
    AvaliableRoomsResponse[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AvailableRoomsRequest(hotel.hotelId);
        setAvailableRoomsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [hotel.hotelId]);

  const handleRoomSelect = (room: AvaliableRoomsResponse) => {
    console.log("Room selected:", room);
    setSelectedRooms((prevSelectedRooms) =>
      prevSelectedRooms.includes(room)
        ? prevSelectedRooms.filter((id) => id !== room)
        : [...prevSelectedRooms, room]
    );
  };
  
  const handleAddClick = () => {
    navigate("/Checkout", {
      state: { results: { hotel, selectedRooms } },
    });
  };

  const isLoading = availableRoomsData.length === 0;

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: 1.5,
        paddingTop: 5,
        paddingBottom: 2,
        borderRadius: 5,
      }}
    >
      <Grid item xs={12} marginBottom={3} sx={{display:'flex',justifyContent:'space-between'}}>
        <Typography variant="h5">Available Rooms:</Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleAddClick}
          disabled={selectedRooms.length === 0}
        >
          Add to cart ({selectedRooms.length})
        </Button>
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
        {isLoading ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          availableRoomsData.map((room:AvaliableRoomsResponse, index) => (
            <Grid item key={index} xs={12} lg={4}>
              <AvailableRoomsCard
                data={room}
                onSelect={() => handleRoomSelect(room)}
                isSelected={selectedRooms.includes(room)}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default AvailableRooms;
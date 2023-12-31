import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Container,
  Grid,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { AvaliableRoomsResponse } from "../../../API/Hotel/types";

const BookedRooms = () => {
  const location = useLocation();

  const { hotel, selectedRooms } = location.state?.results || {};

  const totalCost = selectedRooms.reduce(
    (acc:number, room:AvaliableRoomsResponse) => acc + room.price,
    0
  );

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
      <Typography variant="h5" gutterBottom marginBottom={3}>
        Selected Rooms:
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {selectedRooms && selectedRooms.length > 0 ? (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Hotel Name</TableCell>
                    <TableCell>Room Number</TableCell>
                    <TableCell>Room Type</TableCell>
                    <TableCell>Capacity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRooms.map(
                    (room: AvaliableRoomsResponse, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{hotel.hotelName}</TableCell>
                        <TableCell>{room.roomNumber}</TableCell>
                        <TableCell>{room.roomType}</TableCell>
                        <TableCell>
                          {`Capacity: ${room.capacityOfAdults} Adults, ${room.capacityOfChildren} Children`}
                        </TableCell>
                        <TableCell>{`$${room.price}`}</TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No rooms selected.
            </Typography>
          </Grid>
        )}

        {selectedRooms && selectedRooms.length > 0 && (
          <Grid item xs={12} sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography variant="h6" color="black">
              Total Cost: ${totalCost}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default BookedRooms;

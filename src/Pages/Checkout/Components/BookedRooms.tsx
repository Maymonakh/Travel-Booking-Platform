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
  Box,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { AvaliableRoomsResponse } from "../../../API/Hotel/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BookingRequestProps } from "../../../API/Checkout/types";
import { BookingRequest } from "../../../API/Checkout";

const BookedRooms = () => {
  const location = useLocation();

  const { hotel, selectedRooms } = location.state?.results || {};

  const totalCost = selectedRooms
    ? selectedRooms.reduce(
        (acc: number, room: AvaliableRoomsResponse) => acc + room.price,
        0
      )
    : 0;

  const formik = useFormik({
    initialValues: {
      customerName: "",
      hotelName: hotel ? hotel.hotelName : "",
      roomNumber: selectedRooms? selectedRooms[0].roomNumber : "",
      roomType: selectedRooms? selectedRooms[0].roomType : "",
      bookingDateTime: new Date().toISOString(),
      totalCost: totalCost,
      paymentMethod: "",
      bookingStatus: "Pending",
    },
    validationSchema: Yup.object({
      customerName: Yup.string().required("Required"),
      paymentMethod: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const token = localStorage.getItem("authToken");
        const response = await BookingRequest(token, values);
        // Handle the response as needed
      } catch (error) {
        console.error("Booking request failed", error);
      }
    },
  });

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
      <Typography variant="h5" gutterBottom marginBottom={10}>
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
                  {selectedRooms && selectedRooms.length > 0 ? (
                    selectedRooms.map(
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
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>No rooms selected.</TableCell>
                    </TableRow>
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

      <Grid>
        <Typography variant="h5" gutterBottom marginBottom={3}>
          CheckOut Form:
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Your Name"
                fullWidth
                {...formik.getFieldProps("customerName")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Select
                label="Payment Method"
                fullWidth
                {...formik.getFieldProps("paymentMethod")}
              >
                <MenuItem value="creditCard">Credit Card</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Special Requests or Remarks"
                multiline
                rows={4}
                fullWidth
                {...formik.getFieldProps("specialRequests")}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default BookedRooms;

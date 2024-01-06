import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import { BookingResponse } from "../../API/Checkout/types";
import { ConfirmationRequest } from "../../API/Checkout";
import NavBar from "../../Components/NavBar";

const Confirmation: React.FC = () => {
  const location = useLocation();
  const [bookingData, setBookingData] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await ConfirmationRequest(token);
        console.log(response.data);
        setBookingData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveAsPDF = () => {
    const pdf = new jsPDF();
    pdf.text(`SAFAR.com`, 80, 10);
    pdf.text(`Customer Name: ${bookingData?.customerName}`, 10, 30);
    pdf.text(`Hotel Name: ${bookingData?.hotelName}`, 10, 40);
    pdf.text(`Room Number: ${bookingData?.roomNumber}`, 10, 50);
    pdf.text(`Room Type: ${bookingData?.roomType}`, 10, 60);
    pdf.text(`Booking Date and Time: ${bookingData?.bookingDateTime}`, 10, 70);
    pdf.text(`Total Cost: $${bookingData?.totalCost}`, 10, 80);
    pdf.text(`Payment Method: ${bookingData?.paymentMethod}`, 10, 90);
    pdf.text(`Booking Status: ${bookingData?.bookingStatus}`, 10, 100);
    pdf.save("confirmation.pdf");
  };

  return (
    <Grid className="container">
      <NavBar />
      <Container
        sx={{
          backgroundColor: "white",
          marginTop: 1.5,
          paddingTop: 5,
          paddingBottom: 2,
          borderRadius: 5,
        }}
      >
        <Typography variant="h4" marginBottom={7} paddingLeft={5}>
          Booking Confirmation
        </Typography>

        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : (
          <Grid container paddingLeft={5} flexDirection={"column"} gap={3}>
            <Grid item xs={12} md={6} display="flex" gap={2}>
              <SendIcon fontSize="medium" color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Customer Name:
              </Typography>
              <Typography variant="h6">{bookingData?.customerName}</Typography>
            </Grid>

            <Grid item xs={12} md={6} display="flex" gap={2}>
              <SendIcon fontSize="medium" color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Hotel Name:
              </Typography>
              <Typography variant="h6">{bookingData?.hotelName}</Typography>
            </Grid>
            <Grid item xs={12} md={6} display="flex" gap={2}>
              <SendIcon fontSize="medium" color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Room Number:
              </Typography>
              <Typography variant="h6">{bookingData?.roomNumber}</Typography>
            </Grid>

            <Grid item xs={12} md={6} display="flex" gap={2}>
              <SendIcon fontSize="medium" color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Room Type:
              </Typography>
              <Typography variant="h6">{bookingData?.roomType}</Typography>
            </Grid>

            <Grid item xs={12} md={6} display="flex" gap={2}>
              <SendIcon fontSize="medium" color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Booking Date and Time:
              </Typography>
              <Typography variant="h6">
                {bookingData?.bookingDateTime}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} display="flex" gap={2}>
              <SendIcon fontSize="medium" color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Total Cost:
              </Typography>
              <Typography variant="h6">${bookingData?.totalCost}</Typography>
            </Grid>
            <Grid item xs={12} md={6} display="flex" gap={2}>
              <SendIcon fontSize="medium" color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Payment Method:
              </Typography>
              <Typography variant="h6">{bookingData?.paymentMethod}</Typography>
            </Grid>

            <Grid item xs={12} md={6} display="flex" gap={2}>
              <SendIcon fontSize="medium" color="primary" />
              <Typography variant="h6" fontWeight="bold">
                Booking Status:
              </Typography>
              <Typography variant="h6">{bookingData?.bookingStatus}</Typography>
            </Grid>

            <Grid container spacing={2} justifyContent="center" marginTop={5}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePrint}
                >
                  Print
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveAsPDF}
                >
                  Save as PDF
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </Grid>
  );
};

export default Confirmation;

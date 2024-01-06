import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CreateHotelForm from "../CreateForms/CreateHotelForm";
import EditHotelForm from "../UpdatesForms/EditHotelForm";
import { CityHotelsResponse} from "../../../../API/Admin/types";
import { deleteHotel } from "../../../../API/Admin";

const HotelsTable= ({hotelsData ,cityId}: { hotelsData:  CityHotelsResponse[],cityId:number }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
  const [hotels, setHotels] = useState(hotelsData);
  useEffect(() => {
    setHotels(hotelsData);
  }, [hotelsData]);
  console.log(hotels);
  console.log(hotelsData);


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });


  const [searchTerm, setSearchTerm] = useState<string>("");
  const [creating, setCreating] = useState<boolean>(false);
  const [deletingHotel, setDeletingHotel] = useState<number | null>(null);
  const [editingHotel, setEditingHotel] = useState<number | null>(null);

  const handleCreateClick = () => {
    setCreating(true);
  };

  const handleClose = () => {
    setCreating(false);
    setDeletingHotel(null);
    setEditingHotel(null);
  };

  const handleHotelCreate = (newHotel: any) => {
    if (newHotel && newHotel.name) {
      setHotels((prevHotels) => [
      ...prevHotels,
      { ...newHotel},
    ]);
    setCreating(false);
  }else {
    console.error("Invalid hotel data. 'name' property is missing or undefined.");
  };}

  const handleHotelDelete = (hotelId: number) => {
    setDeletingHotel(hotelId);
  };

  const confirmDeleteHotel = async () => {
    try {
      if (deletingHotel) {
        const token = localStorage.getItem("authToken");
          await deleteHotel(cityId,deletingHotel, token);
          setHotels((prevHotels) =>
          prevHotels.filter((hotel) => hotel.id !== deletingHotel)
        );
        setDeletingHotel(null);
        handleClose();
        setSnackbarMessage("Hotel deleted successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
      setSnackbarMessage("Something wrong");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);    }
  };

  const handleHotelEdit = (hotelId: number) => {
    setEditingHotel(hotelId);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const searchFields = [hotel.name];
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return searchFields.some((field) =>
      field.toLowerCase().includes(normalizedSearchTerm)
    );
  });

  return (
    <Box>
      <Grid xs={12} sx={{ display: "flex", flexDirection: "row" }}>
        <Grid xs={11}>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid xs={1} alignSelf={"center"} marginLeft={2}>
          <Button variant="contained" onClick={handleCreateClick}>
            Create
          </Button>
        </Grid>
      </Grid>
      <Dialog open={creating} onClose={handleClose}>
        <DialogTitle>Create Hotel</DialogTitle>
        <DialogContent>
          <CreateHotelForm
            onClose={handleClose}
            onHotelCreate={handleHotelCreate}
            cityId={cityId}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={deletingHotel !== null} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this hotel?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteHotel} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editingHotel !== null} onClose={handleClose}>
        <DialogTitle>Edit Hotel</DialogTitle>
        <DialogContent>
          <EditHotelForm
            onClose={handleClose}
            onHotelEdit={(editedHotel) => {
              setHotels((prevHotels) =>
                prevHotels.map((hotel) =>
                  hotel.id === editingHotel
                    ? { ...hotel, ...editedHotel }
                    : hotel
                )
              );
              setEditingHotel(null);
            }}
            hotelData={hotels.find((hotel) => hotel.id === editingHotel)}
          />
        </DialogContent>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Hotel Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Star Rate</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Creation Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Modification Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredHotels.map((hotel) => (
              <TableRow key={hotel.id}>
                <TableCell>{hotel.id}</TableCell>
                <TableCell>{hotel.name}</TableCell>
                <TableCell>{hotel.hotelType}</TableCell>
                <TableCell>{hotel.starRating}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleHotelDelete(hotel.id)}
                    color="primary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleHotelEdit(hotel.id)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={snackbarOpen} onClose={handleSnackbarClose}>
        <SnackbarContent
          message={snackbarMessage}
          sx={{ backgroundColor: snackbarSeverity === "success" ? "green" : "red" }}
        />
      </Snackbar>
    </Box>
  );
};

export default HotelsTable;

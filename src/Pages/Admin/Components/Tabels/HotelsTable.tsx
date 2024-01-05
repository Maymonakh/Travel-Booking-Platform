import React, { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CreateHotelForm from "../CreateForms/CreateHotelForm";
import EditHotelForm from "../UpdatesForms/EditHotelForm";

const HotelsTable: React.FC = () => {
  const hotelsData = [
    {
      id: 1,
      name: "Grand Hotel",
      starRate: 5,
      owner: "Hotelier X",
      roomNumber: 300,
      createDate: "2022-01-01",
      modifyDate: "2022-01-02",
      city: "New York",
    },
    {
      id: 2,
      name: "Beach Resort",
      starRate: 4,
      owner: "Hotelier Y",
      roomNumber: 150,
      createDate: "2022-02-15",
      modifyDate: "2022-03-01",
      city: "London",
    },
    {
      id: 3,
      name: "City View Inn",
      starRate: 3,
      owner: "Hotelier Z",
      roomNumber: 200,
      createDate: "2022-03-10",
      modifyDate: "2022-04-05",
      city: "Tokyo",
    },
    {
      id: 4,
      name: "Mountain Lodge",
      starRate: 4,
      owner: "Hotelier W",
      roomNumber: 120,
      createDate: "2022-04-20",
      modifyDate: "2022-05-15",
      city: "Paris",
    },
  ];

  const [hotels, setHotels] = useState([...hotelsData]);
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
    setHotels((prevHotels) => [
      ...prevHotels,
      { ...newHotel, id: prevHotels.length + 1 },
    ]);
    setCreating(false);
  };

  const handleHotelDelete = (hotelId: number) => {
    setDeletingHotel(hotelId);
  };

  const confirmDeleteHotel = () => {
    setHotels((prevHotels) =>
      prevHotels.filter((hotel) => hotel.id !== deletingHotel)
    );
    setDeletingHotel(null);
    handleClose();
  };

  const handleHotelEdit = (hotelId: number) => {
    setEditingHotel(hotelId);
  };

  const filteredHotels = hotels.filter((hotel) => {
    const searchFields = [hotel.name, hotel.city];
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
        <Grid xs={1} alignSelf={"center"} marginLeft={4}>
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
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Star Rate</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Owner</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Room Number</TableCell>
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
                <TableCell>{hotel.name}</TableCell>
                <TableCell>{hotel.city}</TableCell>
                <TableCell>{hotel.starRate}</TableCell>
                <TableCell>{hotel.owner}</TableCell>
                <TableCell>{hotel.roomNumber}</TableCell>
                <TableCell>{hotel.createDate}</TableCell>
                <TableCell>{hotel.modifyDate}</TableCell>
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
    </Box>
  );
};

export default HotelsTable;

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
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CreateRoomForm from "../CreateForms/CreateRoomForm";

const RoomsTable: React.FC = () => {
  const roomsData = [
    {
      id: 1,
      number: 101,
      availability: true,
      adultCapacity: 2,
      childrenCapacity: 1,
      createDate: "2022-01-01",
      modifyDate: "2022-01-02",
      hotelName: "Comfort Suites",
      city: "New York",
    },
    {
      id: 2,
      number: 201,
      availability: false,
      adultCapacity: 3,
      childrenCapacity: 2,
      createDate: "2022-02-15",
      modifyDate: "2022-03-01",
      hotelName: "Grand Hotel",
      city: "Los Angeles",
    },
    {
      id: 3,
      number: 301,
      availability: true,
      adultCapacity: 2,
      childrenCapacity: 1,
      createDate: "2022-03-10",
      modifyDate: "2022-04-05",
      hotelName: "City View Inn",
      city: "Chicago",
    },
    {
      id: 4,
      number: 102,
      availability: true,
      adultCapacity: 1,
      childrenCapacity: 0,
      createDate: "2022-04-20",
      modifyDate: "2022-05-15",
      hotelName: "Downtown Suites",
      city: "San Francisco",
    },
  ];

  const [rooms, setRooms] = useState([...roomsData]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [creating, setCreating] = useState<boolean>(false);
  const [deletingRoom, setDeletingRoom] = useState<number | null>(null);

  const handleCreateClick = () => {
    setCreating(true);
  };

  const handleClose = () => {
    setCreating(false);
    setDeletingRoom(null);
  };

  const handleRoomCreate = (newRoom: any) => {
    setRooms((prevRooms) => [
      ...prevRooms,
      { ...newRoom, id: prevRooms.length + 1 },
    ]);
  };

  const handleRoomDelete = (roomId: number) => {
    setDeletingRoom(roomId);
  };

  const confirmDeleteRoom = () => {
    setRooms((prevRooms) =>
      prevRooms.filter((room) => room.id !== deletingRoom)
    );
    setDeletingRoom(null);
    handleClose();
  };

  const filteredRooms = rooms.filter((room) => {
    const searchFields = [room.number.toString(), room.city, room.hotelName];
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
        <DialogTitle>Create Room</DialogTitle>
        <DialogContent>
          <CreateRoomForm
            onClose={handleClose}
            onRoomCreate={handleRoomCreate}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deletingRoom !== null} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this room?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteRoom} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Hotel</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Room Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Availability</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Adult Capacity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Children Capacity
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Creation Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Modification Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.city}</TableCell>
                <TableCell>{room.hotelName}</TableCell>
                <TableCell>{room.number}</TableCell>
                <TableCell>{room.availability ? "Yes" : "No"}</TableCell>
                <TableCell>{room.adultCapacity}</TableCell>
                <TableCell>{room.childrenCapacity}</TableCell>
                <TableCell>{room.createDate}</TableCell>
                <TableCell>{room.modifyDate}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRoomDelete(room.id)}
                    color="primary"
                  >
                    <DeleteIcon />
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

export default RoomsTable;

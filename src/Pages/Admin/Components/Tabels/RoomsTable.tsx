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
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  SnackbarContent,
  Drawer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CreateRoomForm from "../CreateForms/CreateRoomForm";
import EditRoomForm from "../UpdatesForms/EditRoomForm";
import { HotelRoomsResponse } from "../../../../API/Admin/types";
import { deleteRoom } from "../../../../API/Admin";

const RoomsTable = ({
  roomsData,
  hotelId,
}: {
  roomsData: HotelRoomsResponse[];
  hotelId: number;
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [rooms, setRooms] = useState(roomsData);
  useEffect(() => {
    setRooms(roomsData);
  }, [roomsData]);
  console.log(hotelId);
  console.log(rooms);
  console.log(roomsData);

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
  const [deletingRoom, setDeletingRoom] = useState<number | null>(null);
  const [editingRoom, setEditingRoom] = useState<number | null>(null);

  const handleCreateClick = () => {
    setCreating(true);
  };

  const handleClose = () => {
    setCreating(false);
    setDeletingRoom(null);
    setEditingRoom(null);
  };

  const handleRoomCreate = (newRoom: any) => {
    if (newRoom && newRoom.roomNumber) {
      setRooms((prevRooms) => [...prevRooms, { ...newRoom }]);
      setCreating(false);
    } else {
      console.error(
        "Invalid room data. 'Room Number' property is missing or undefined."
      );
    }
  };

  const handleRoomDelete = (roomId: number) => {
    setDeletingRoom(roomId);
  };

  const confirmDeleteRoom = async () => {
    try {
      if (deletingRoom) {
        const token = localStorage.getItem("authToken");
        await deleteRoom(hotelId, deletingRoom, token);
        setRooms((prevRooms) =>
          prevRooms.filter((room) => room.roomId !== deletingRoom)
        );
        setDeletingRoom(null);
        handleClose();
        setSnackbarMessage("Room deleted successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      setSnackbarMessage("Something wrong");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleRoomEdit = (roomId: number) => {
    setEditingRoom(roomId);
  };

  const filteredRooms = rooms.filter((room) => {
    const searchFields = [room.roomNumber.toString()];
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
        <DialogTitle>Create Room</DialogTitle>
        <DialogContent>
          <CreateRoomForm
            onClose={handleClose}
            onRoomCreate={handleRoomCreate}
            hotelId={hotelId}
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
      <Drawer
        anchor="right"
        open={editingRoom !== null}
        onClose={handleClose}
        sx={{ width: 50 }}
      >
        <DialogTitle>Edit Room</DialogTitle>
        <DialogContent>
          <EditRoomForm
            onClose={handleClose}
            onRoomEdit={(editedRoom) => {
              setRooms((prevRooms) =>
                prevRooms.map((room) =>
                  room.roomId === editingRoom
                    ? { ...room, ...editedRoom }
                    : room
                )
              );
              setEditingRoom(null);
            }}
            roomData={rooms.find((room) => room.roomId === editingRoom)}
          />
        </DialogContent>
      </Drawer>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>roomId</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Room Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
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
              <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRooms.map((room) => (
              <TableRow key={room.roomId}>
                <TableCell>{room.roomId}</TableCell>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.price}</TableCell>
                <TableCell>{room.availability ? "Yes" : "No"}</TableCell>
                <TableCell>{room.capacityOfAdults}</TableCell>
                <TableCell>{room.capacityOfChildren}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRoomDelete(room.roomId)}
                    color="primary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRoomEdit(room.roomId)}
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
          sx={{
            backgroundColor:
              snackbarSeverity === "success" ? "#03F94E" : "#F90A03",
          }}
        />
      </Snackbar>
    </Box>
  );
};

export default RoomsTable;

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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";


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
    {
      id: 5,
      number: 202,
      availability: false,
      adultCapacity: 2,
      childrenCapacity: 1,
      createDate: "2022-05-25",
      modifyDate: "2022-06-20",
      hotelName: "Oceanfront Resort",
      city: "Miami",
    },
    {
      id: 6,
      number: 302,
      availability: true,
      adultCapacity: 2,
      childrenCapacity: 1,
      createDate: "2022-06-30",
      modifyDate: "2022-07-10",
      hotelName: "Mountain View Lodge",
      city: "Denver",
    },
    {
      id: 7,
      number: 103,
      availability: true,
      adultCapacity: 3,
      childrenCapacity: 2,
      createDate: "2022-07-15",
      modifyDate: "2022-08-05",
      hotelName: "Luxury Suites",
      city: "Las Vegas",
    },
    {
      id: 8,
      number: 203,
      availability: false,
      adultCapacity: 2,
      childrenCapacity: 1,
      createDate: "2022-08-15",
      modifyDate: "2022-09-10",
      hotelName: "Harbor View Hotel",
      city: "Seattle",
    },
    {
      id: 9,
      number: 303,
      availability: true,
      adultCapacity: 1,
      childrenCapacity: 0,
      createDate: "2022-09-20",
      modifyDate: "2022-10-01",
      hotelName: "Cozy Inn",
      city: "Boston",
    },
    {
      id: 10,
      number: 104,
      availability: true,
      adultCapacity: 2,
      childrenCapacity: 1,
      createDate: "2022-10-05",
      modifyDate: "2022-11-02",
      hotelName: "Riverside Lodge",
      city: "Portland",
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredRooms = roomsData.filter((room) => {
    const searchFields = [room.number.toString(), room.city ,room.hotelName];
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return searchFields.some((field) => field.toLowerCase().includes(normalizedSearchTerm));
  });

  return (
    <Box>
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
                  <IconButton color="secondary">
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

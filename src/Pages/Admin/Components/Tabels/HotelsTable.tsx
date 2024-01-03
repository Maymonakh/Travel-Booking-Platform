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


const HotelsTable: React.FC = () => {
  const hotelsData = [
    { id: 1, name: "Grand Hotel", starRate: 5, owner: "Hotelier X", roomNumber: 300, createDate: "2022-01-01", modifyDate: "2022-01-02", city: "New York" },
    { id: 2, name: "Beach Resort", starRate: 4, owner: "Hotelier Y", roomNumber: 150, createDate: "2022-02-15", modifyDate: "2022-03-01", city: "London" },
    { id: 3, name: "City View Inn", starRate: 3, owner: "Hotelier Z", roomNumber: 200, createDate: "2022-03-10", modifyDate: "2022-04-05", city: "Tokyo" },
    { id: 4, name: "Mountain Lodge", starRate: 4, owner: "Hotelier W", roomNumber: 120, createDate: "2022-04-20", modifyDate: "2022-05-15", city: "Paris" },
    { id: 5, name: "Luxury Suites", starRate: 5, owner: "Hotelier V", roomNumber: 180, createDate: "2022-05-25", modifyDate: "2022-06-20", city: "Sydney" },
    { id: 6, name: "Riverside Hotel", starRate: 4, owner: "Hotelier U", roomNumber: 250, createDate: "2022-06-30", modifyDate: "2022-07-10", city: "Mumbai" },
    { id: 7, name: "Historic Inn", starRate: 3, owner: "Hotelier T", roomNumber: 80, createDate: "2022-07-15", modifyDate: "2022-08-05", city: "Rio de Janeiro" },
    { id: 8, name: "Urban Retreat", starRate: 4, owner: "Hotelier S", roomNumber: 200, createDate: "2022-08-15", modifyDate: "2022-09-10", city: "Berlin" },
    { id: 9, name: "Seaside Resort", starRate: 5, owner: "Hotelier R", roomNumber: 300, createDate: "2022-09-20", modifyDate: "2022-10-01", city: "Cape Town" },
    { id: 10, name: "Skyline Tower", starRate: 4, owner: "Hotelier Q", roomNumber: 180, createDate: "2022-10-05", modifyDate: "2022-11-02", city: "Moscow" },
  ];
  
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredHotels = hotelsData.filter((hotel) => {
    const searchFields = [hotel.name, hotel.city];
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

export default HotelsTable;
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
  InputAdornment,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const CitiesTable: React.FC = () => {
  const citiesData = [
    {
      id: 1,
      name: "New York",
      country: "USA",
      postOffice: "NYPO",
      numberOfHotels: 1500,
      createDate: "2022-01-01",
      modifyDate: "2022-01-02",
    },
    {
      id: 2,
      name: "London",
      country: "UK",
      postOffice: "LONPO",
      numberOfHotels: 1000,
      createDate: "2022-02-15",
      modifyDate: "2022-03-01",
    },
    {
      id: 3,
      name: "Tokyo",
      country: "Japan",
      postOffice: "TKYPO",
      numberOfHotels: 800,
      createDate: "2022-03-10",
      modifyDate: "2022-04-05",
    },
    {
      id: 4,
      name: "Paris",
      country: "France",
      postOffice: "PARPO",
      numberOfHotels: 1200,
      createDate: "2022-04-20",
      modifyDate: "2022-05-15",
    },
    {
      id: 5,
      name: "Sydney",
      country: "Australia",
      postOffice: "SYDPO",
      numberOfHotels: 600,
      createDate: "2022-05-25",
      modifyDate: "2022-06-20",
    },
    {
      id: 6,
      name: "Mumbai",
      country: "India",
      postOffice: "MBIPO",
      numberOfHotels: 900,
      createDate: "2022-06-30",
      modifyDate: "2022-07-10",
    },
    {
      id: 7,
      name: "Rio de Janeiro",
      country: "Brazil",
      postOffice: "RJPO",
      numberOfHotels: 700,
      createDate: "2022-07-15",
      modifyDate: "2022-08-05",
    },
    {
      id: 8,
      name: "Berlin",
      country: "Germany",
      postOffice: "BERPO",
      numberOfHotels: 1100,
      createDate: "2022-08-15",
      modifyDate: "2022-09-10",
    },
    {
      id: 9,
      name: "Cape Town",
      country: "South Africa",
      postOffice: "CTPO",
      numberOfHotels: 500,
      createDate: "2022-09-20",
      modifyDate: "2022-10-01",
    },
    {
      id: 10,
      name: "Moscow",
      country: "Russia",
      postOffice: "MOSPO",
      numberOfHotels: 1000,
      createDate: "2022-10-05",
      modifyDate: "2022-11-02",
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCities = citiesData.filter((city) => {
    const searchFields = [city.name, city.country];
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return searchFields.some((field) =>
      field.toLowerCase().includes(normalizedSearchTerm)
    );
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
              <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Post Office</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Number of Hotels
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Creation Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Modification Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCities.map((city) => (
              <TableRow key={city.id}>
                <TableCell>{city.name}</TableCell>
                <TableCell>{city.country}</TableCell>
                <TableCell>{city.postOffice}</TableCell>
                <TableCell>{city.numberOfHotels}</TableCell>
                <TableCell>{city.createDate}</TableCell>
                <TableCell>{city.modifyDate}</TableCell>
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

export default CitiesTable;

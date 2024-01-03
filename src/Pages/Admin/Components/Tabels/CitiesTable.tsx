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
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import CreateCityForm from "../CreateForms/CreateCityForm";

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
  ];

  const [cities, setCities] = useState([...citiesData]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [creating, setCreating] = useState<boolean>(false);
  const [deletingCity, setDeletingCity] = useState<number | null>(null);

  const handleCreateClick = () => {
    setCreating(true);
  };

  const handleClose = () => {
    setCreating(false);
    setDeletingCity(null);
  };

  const handleCityCreate = (newCity: any) => {
    setCities((prevCities) => [
      ...prevCities,
      { ...newCity, id: prevCities.length + 1 },
    ]);
  };

  const handleCityDelete = (cityId: number) => {
    setDeletingCity(cityId);
  };

  const confirmDeleteCity = () => {
    setCities((prevCities) =>
      prevCities.filter((city) => city.id !== deletingCity)
    );
    setDeletingCity(null);
    handleClose();
  };

  const filteredCities = cities.filter((city) => {
    const searchFields = [city.name, city.country];
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
        <DialogTitle>Create City</DialogTitle>
        <DialogContent>
          <CreateCityForm
            onClose={handleClose}
            onCityCreate={handleCityCreate}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deletingCity !== null} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this city?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteCity} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
                  <IconButton
                    color="primary"
                    onClick={() => handleCityDelete(city.id)}
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

export default CitiesTable;

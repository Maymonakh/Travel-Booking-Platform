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
  InputAdornment,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  SnackbarContent,
  Drawer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CreateCityForm from "../CreateForms/CreateCityForm";
import EditCityForm from "../UpdatesForms/EditCityForm";
import { CitiesResponse } from "../../../../API/Admin/types";
import { CitiesRequest, deleteCity } from "../../../../API/Admin";

const CitiesTable: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const [citiesData, setCitiesData] = useState<CitiesResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CitiesRequest();
        setCitiesData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [creating, setCreating] = useState<boolean>(false);
  const [deletingCity, setDeletingCity] = useState<number | null>(null);
  const [editingCity, setEditingCity] = useState<number | null>(null);
  const handleCreateClick = () => {
    setCreating(true);
  };

  const handleClose = () => {
    setCreating(false);
    setDeletingCity(null);
    setEditingCity(null);
  };

  const handleCityCreate = (newCity: any) => {
    if (newCity && newCity.name) {
      setCitiesData((prevCities) => [...prevCities, { ...newCity }]);
      setCreating(false);
    } else {
      console.error(
        "Invalid city data. 'name' property is missing or undefined."
      );
    }
  };

  const handleCityDelete = (cityId: number) => {
    setDeletingCity(cityId);
  };

  const confirmDeleteCity = async () => {
    try {
      if (deletingCity) {
        const token = localStorage.getItem("authToken");
        await deleteCity(deletingCity, token);
        setCitiesData((prevCities) =>
          prevCities.filter((city) => city.id !== deletingCity)
        );
        setDeletingCity(null);
        handleClose();
        setSnackbarMessage("City deleted successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error deleting city:", error);
      setSnackbarMessage("Something wrong");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCityEdit = (cityId: number) => {
    setEditingCity(cityId);
  };

  const filteredCities = citiesData.filter((city) => {
    const searchFields = [city.name];
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

      <Drawer
        anchor="right"
        open={editingCity !== null}
        onClose={handleClose}
        sx={{ width: 50 }}
      >
        <DialogTitle>Edit City</DialogTitle>
        <DialogContent>
          <EditCityForm
            onClose={handleClose}
            onCityEdit={(editedCity) => {
              setCitiesData((prevCities) =>
                prevCities.map((city) =>
                  city.id === editingCity ? { ...city, ...editedCity } : city
                )
              );
            }}
            cityData={citiesData.find((city) => city.id === editingCity)}
          />
        </DialogContent>
      </Drawer>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Post Office</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Creation Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Modification Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCities.map((city) => (
              <TableRow key={city.id}>
                <TableCell>{city.id}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell>World</TableCell>
                <TableCell>NYPO</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>{formattedDate}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleCityDelete(city.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleCityEdit(city.id)}
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

export default CitiesTable;

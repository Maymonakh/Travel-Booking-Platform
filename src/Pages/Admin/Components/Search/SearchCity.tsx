import React, { useEffect, useState } from "react";
import { TextField, Grid, Button, Autocomplete } from "@mui/material";
import { CitiesResponse } from "../../../../API/Admin/types";
import { CitiesRequest } from "../../../../API/Admin";

interface SearchbarProps {
  onSearch: (selectedCity: { label: string; value: number } | null) => void;
}

const SearchCity: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [citiesData, setCitiesData] = useState<CitiesResponse[]>([]);
  const [selectedCity, setSelectedCity] = useState<{
    label: string;
    value: number;
  } | null>(null);

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

  const handleCityChange = (
    event: React.ChangeEvent<{}>,
    newValue: { label: string; value: number } | null
  ) => {
    setSelectedCity(newValue);
  };

  const handleSearch = async () => {
    try {
      onSearch(selectedCity);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={2} justifyContent={"flex-end"} marginLeft={3}>
      <Grid item xs={6}>
        <Autocomplete
          options={citiesData.map((city) => ({
            label: city.name,
            value: city.id,
          }))}
          getOptionLabel={(option) => option.label}
          value={selectedCity}
          onChange={handleCityChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Select city"
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid item xs={3} alignSelf={"center"}>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleSearch}
        >
          Select
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchCity;

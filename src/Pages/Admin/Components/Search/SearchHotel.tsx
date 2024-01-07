import React, { useEffect, useState } from "react";
import { TextField, Grid, Button, Autocomplete } from "@mui/material";
import { HotelsResponse } from "../../../../API/Admin/types";
import { HotelsRequest } from "../../../../API/Admin";

interface SearchbarProps {
  onSearch: (selectedHotel: { label: string; value: number } | null) => void;
}

const SearchHotel: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [hotelsData, setHotelsData] = useState<HotelsResponse[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<{
    label: string;
    value: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HotelsRequest();
        setHotelsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleHotelChange = (
    event: React.ChangeEvent<{}>,
    newValue: { label: string; value: number } | null
  ) => {
    setSelectedHotel(newValue);
  };

  const handleSearch = async () => {
    try {
      onSearch(selectedHotel);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={2} justifyContent={"flex-end"} marginLeft={3}>
      <Grid item xs={6}>
        <Autocomplete
          options={hotelsData.map((hotel) => ({
            label: hotel.name,
            value: hotel.id,
          }))}
          getOptionLabel={(option) => option.label}
          value={selectedHotel}
          onChange={handleHotelChange}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Select hotel"
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

export default SearchHotel;

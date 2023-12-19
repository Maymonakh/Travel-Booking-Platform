import React, { useState } from "react";
import { Container, Typography, TextField, Grid, Button } from "@mui/material";
import "./SearchBar.css";
import Countercomponent from "./Countercomponent";

interface SearchbarProps {
  onSearch: (searchParams: {
    checkInDate: Date;
    checkOutDate: Date;
    adults: number;
    children: number;
    rooms: number;
  }) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [checkInDate, setCheckInDate] = useState<Date>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date());
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleSearch = () => {
    onSearch({ checkInDate, checkOutDate, adults, children, rooms });
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: 5,
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} onClick={toggleExpansion}>
          <TextField
            fullWidth
            label="Search for hotels, cities..."
            variant="outlined"
          />
        </Grid>
        {isExpanded && (
          <>
            <Grid item xs={12} container justifyContent="space-between">
              <TextField
                label="Check-in"
                type="date"
                variant="outlined"
                value={checkInDate.toISOString().split("T")[0]}
                onChange={(e) => setCheckInDate(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Check-out"
                type="date"
                variant="outlined"
                value={checkOutDate.toISOString().split("T")[0]}
                onChange={(e) => setCheckOutDate(new Date(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Countercomponent
                label="Adults:"
                value={adults}
                onIncrement={() => setAdults(adults + 1)}
                onDecrement={() => setAdults(Math.max(adults - 1, 1))}
              />
              <Countercomponent
                label="Children:"
                value={children}
                onIncrement={() => setChildren(children + 1)}
                onDecrement={() => setChildren(Math.max(children - 1, 0))}
              />
              <Countercomponent
                label="Rooms:"
                value={rooms}
                onIncrement={() => setRooms(rooms + 1)}
                onDecrement={() => setRooms(Math.max(rooms - 1, 1))}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Searchbar;

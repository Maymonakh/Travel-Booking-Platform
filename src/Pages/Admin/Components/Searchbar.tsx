import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  Autocomplete,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const Searchbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: 5,
        padding: 3,
        borderRadius: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={10} >
              <TextField
                fullWidth
                label="where are you going..."
                variant="outlined"
              />
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
          >
            Search
          </Button>
        </Grid>
        </Grid>
    </Container>
  );
};

export default Searchbar;

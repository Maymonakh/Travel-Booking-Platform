import React from "react";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CountercomponentProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Countercomponent: React.FC<CountercomponentProps> = ({
  label,
  value,
  onIncrement,
  onDecrement,
}) => {
  return (
    <Grid
      container
      item
      lg={2}
      xs={4}
      sx={{ border: "1px solid #ddd", borderRadius: 1, padding: 1 }}
    >
      <Typography variant="subtitle1" sx={{ flexGrow: 0 ,margin:0.5}}>
        {label}
      </Typography>
      <IconButton size="small" onClick={onIncrement} >
        <AddIcon />
      </IconButton>
      <span style={{marginTop:6 ,fontWeight:500}}>{value}</span>
      <IconButton size="small" onClick={onDecrement}>
        <RemoveIcon />
      </IconButton>
    </Grid>
  );
};

export default Countercomponent;

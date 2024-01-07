import React from "react";
import { Grid, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Grid
      sx={{
        backgroundColor: "white",
        height: 60,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography sx={{ color: "gray" }}>© 2023 SAFAR.com™</Typography>
    </Grid>
  );
};

export default Footer;

import React from "react";
import { Grid } from "@mui/material";
import AdminNavBar from "./Components/Admin-Navbar";

const Admin: React.FC = () => {
  return (
    <div>
      <AdminNavBar/>
      <Grid container spacing={1.5}>

        <Grid item xs={12} >
        </Grid>
      </Grid>
    </div>
  );
};

export default Admin;

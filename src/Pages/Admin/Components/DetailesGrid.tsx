import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import CitiesTable from "./Tabels/CitiesTable";
import HotelsTable from "./Tabels/HotelsTable";
import RoomsTable from "./Tabels/RoomsTable";

interface DetailsGridProps {
  entityType: string;
}

const DetailsGrid: React.FC<DetailsGridProps> = ({ entityType }) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop:10,
        paddingTop: 5,
        paddingBottom: 2,
        borderRadius: 5,
      }}
    >
      {entityType === "Cities" ? (
        <Grid
          container
          xs={12}
          sx={{
            borderBottom: "2px solid Gray",
            paddingBottom: 2,
            marginBottom: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              borderBottom: "2px solid Gray",
              paddingBottom: 2,
              marginBottom: 2,
            }}
          >
            Cities Management
          </Typography>
          <CitiesTable />
        </Grid>
      ) : entityType === "Hotels" ? (
        <Grid
        container
        xs={12}
        sx={{
          borderBottom: "2px solid Gray",
          paddingBottom: 2,
          marginBottom: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            borderBottom: "2px solid Gray",
            paddingBottom: 2,
            marginBottom: 2,
          }}
        >
          Hotels Management
        </Typography>
        <HotelsTable />
      </Grid>
      ) : entityType === "Rooms" ? (
        <Grid
        container
        xs={12}
        sx={{
          borderBottom: "2px solid Gray",
          paddingBottom: 2,
          marginBottom: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            borderBottom: "2px solid Gray",
            paddingBottom: 2,
            marginBottom: 2,
          }}
        >
          Rooms Management
        </Typography>
        <RoomsTable />
      </Grid>
      ) : null}
    </Container>
  );
};

export default DetailsGrid;

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import * as React from "react";

export default function Home() {
  let navigate = useNavigate();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      alignContent="center"
    >
      <Grid item xs={12} sx={{ marginTop: 40 }}>
        <Typography
          variant="h1"
          color="common.white"
          sx={{ fontWeight: "bold" }}
          align="center"
        >
          VelocityDraft
        </Typography>
        <Typography
          align="center"
          variant="h4"
          color="secondary.light"
          sx={{
            fontWeight: 400,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          College Application Essay Scheduler
        </Typography>
      </Grid>
      <Button
        variant="contained"
        sx={{
          color: "white",
          fontWeight: "medium",
          marginTop: 1,
          width: 550,
          height: 50,
          marginBottom: 49,
          fontSize: "20px",
        }}
        onClick={() => navigate("/scheduler")}
      >
        Try it out! It's free!
      </Button>
    </Grid>
  );
}

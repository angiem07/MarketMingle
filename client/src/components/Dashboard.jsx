import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  Switch,
  Typography,
  Box,
} from "@mui/material";
//Material UI is popular React UI framework that provides a clear way to implementing Google's Material Design principles.

const DashBoard = () => {
  const [viewOtherInventory, setViewOtherInventory] = useState(false);
  const handleViewToggle = () => {
    setViewOtherInventory(!viewOtherInventory);
  };
  const handleUploadInventory = () => {
    console.log("Inventory upload functionarylity goes here");
  };
  return (
    <Box p={3}>
      <Typography variant="h4">Dashboard</Typography>
      <hr />
      <section className="flex flex-col gap-y-6 mt-8">
        <div className="text-center text-3xl font-bold py-5 bg-primary rounded-lg shadow-md">
          Welcome to the dashboard!
        </div>
      </section>
      {/* This will render a switch to toggle between viewing other sellers' inventory and a button to uplooad it. */}
      <FormControlLabel
        control={
          <Switch checked={viewOtherInventory} onChange={handleViewToggle} />
        }
        label="View Other Inventories"
      />
      {viewOtherInventory && (
        <Typography variant="body1">
          You are currently viewing other inventories. To go back to your own
          inventory click the button below.
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        Onclick={handleUploadInventory}
        sx={{ mt: 2 }}
      >
        Upload New Inventory
      </Button>
    </Box>
  );
};
export default DashBoard;
// export default DashBoard;

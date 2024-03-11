// src/components/InventoryList.jsx
import { useState, useEffect } from 'react';
import InventoryItem from './InventoryItem';
import { Box, Grid } from '@mui/material';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Fetch inventory data from API and set it
    // This is a placeholder for your fetch logic
    const fetchedInventory = [
      { id: 1, name: "Item 1", description: "Description 1", price: 100, quantity: 10 },
      // Add more items here
    ];
    setInventory(fetchedInventory);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {inventory.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <InventoryItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InventoryList;

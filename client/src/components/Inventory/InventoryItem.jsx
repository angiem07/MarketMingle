
// import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const InventoryItem = ({ item }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="body2">
          Price: ${item.price}
          <br />
          Quantity: {item.quantity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};

export default InventoryItem;

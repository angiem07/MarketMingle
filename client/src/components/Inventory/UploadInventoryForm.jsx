
import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const UploadInventoryForm = ({ onClose }) => {
  const [inventoryData, setInventoryData] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInventoryData({ ...inventoryData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inventoryData);
    // Add the API call or logic to upload the inventory data here
    onClose(); // Close the modal on successful submission
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Inventory Name"
        name="name"
        autoComplete="name"
        autoFocus
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="description"
        label="Description"
        type="text"
        id="description"
        autoComplete="description"
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="price"
        label="Price"
        type="number"
        id="price"
        autoComplete="price"
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="quantity"
        label="Quantity"
        type="number"
        id="quantity"
        autoComplete="quantity"
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Upload Inventory
      </Button>
    </Box>
  );
};

export default UploadInventoryForm;

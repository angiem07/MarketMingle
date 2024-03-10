import { useState } from "react";
import {
  Button, Typography, Box, Modal, Card, CardContent,
} from "@mui/material";
import UploadInventoryForm from "../components/Inventory/UploadInventoryForm"; // Assume this is your custom form component

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [viewOtherInventory, setViewOtherInventory] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const handleViewToggle = () => {
    setViewOtherInventory(!viewOtherInventory);
  };
  const handleOpenUploadModal = () => setOpenUploadModal(true);
  const handleCloseUploadModal = () => setOpenUploadModal(false);

  return (
    <Box p={3}>
      {/* Dashboard UI elements */}
      
      <Modal
        open={openUploadModal}
        onClose={handleCloseUploadModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UploadInventoryForm onClose={handleCloseUploadModal} />
        </Box>
      </Modal>
      
      <Card sx={{ minWidth: 275, mt: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Inventory Item #1
          </Typography>
          <Typography variant="h5" component="div">
            Example Item
          </Typography>
          {/* Additional item details */}
        </CardContent>
        {/* Actions for the card */}
      </Card>
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenUploadModal}
        sx={{ mt: 2 }}
      >
        Upload New Inventory
      </Button>
    </Box>
  );
};

export default Dashboard;

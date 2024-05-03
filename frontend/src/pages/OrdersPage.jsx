import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, IconButton } from '@mui/material';
import AdminMenu from '../components/AdminMenu';
import DoneIcon from '@mui/icons-material/Done';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SearchIcon from '@mui/icons-material/Search';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatedOrderData, setUpdatedOrderData] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:3001/orders')
      .then(response => {
        setOrders(response.data);
        setFilteredOrders(response.data); // Initialize filtered orders with all orders
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setUpdatedOrderData({ ...order });
    setEditDialogOpen(true);
  };

  const handleUpdateOrder = () => {
    axios.put(`http://localhost:3001/orders/${selectedOrder._id}`, updatedOrderData)
      .then(response => {
        console.log('Order updated successfully:', response.data);
        fetchOrders();
        setEditDialogOpen(false);
      })
      .catch(error => {
        console.error('Error updating order:', error);
      });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    filterOrders(value);
  };

  const filterOrders = (term) => {
    const filtered = orders.filter(order =>
      order.orderId.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const handleDeleteOrder = (orderId) => {
    axios.delete(`http://localhost:3001/orders/${orderId}`)
      .then(response => {
        console.log('Order deleted successfully');
        fetchOrders();
      })
      .catch(error => {
        console.error('Error deleting order:', error);
      });
  };

  return (
    <div>
      <AdminMenu />
      <Container style={{ marginTop: '40px', marginLeft: '240px' }}>
        {/* Search bar */}
        <Box display="flex" alignItems="center" mb={2}> {/* Added margin bottom to create space */}
          <IconButton>
            <SearchIcon />
          </IconButton>
          <TextField
            label="Search by Order ID"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={handleChange}
            InputProps={{
              startAdornment: null,
            }}
          />
        </Box>
        
        <Grid container spacing={3}>
          {filteredOrders.map(order => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card style={{ position: 'relative' }}>
                {order.status === 'approved' ? (
                  <DoneIcon style={{ position: 'absolute', top: 5, right: 5, color: 'green' }} />
                ) : (
                  <ScheduleIcon style={{ position: 'absolute', top: 5, right: 5, color: 'yellow' }} />
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom align="center">{order.itemName}</Typography>
                  <Typography variant="body1" color="textSecondary">Order ID:  {order.orderId}</Typography>
                  <Typography variant="body1" color="textSecondary">Quantity:  {order.quantity}</Typography>
                  <Typography variant="body1" color="textSecondary">Supplier:  {order.supplierName}</Typography>
                  <Typography variant="body1" color="textSecondary">Unit Price:  {order.unitPrice}</Typography>
                  <Typography variant="body1" color="textSecondary">Delivery Charges:  {order.deliveryCharges}</Typography>
                  <Typography variant="body1" color="textSecondary">Total Price:  {order.totalPrice}</Typography>
                  <Button variant="contained" color="primary" onClick={() => handleEditOrder(order)}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteOrder(order._id)} style={{ marginLeft: '8px' }}>Delete</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <div>
              <TextField
                label="Item Name"
                fullWidth
                margin="normal"
                name="itemName"
                value={updatedOrderData.itemName}
                onChange={(e) => setUpdatedOrderData({ ...updatedOrderData, itemName: e.target.value })}
              />
              <TextField
                label="Quantity"
                fullWidth
                margin="normal"
                name="quantity"
                value={updatedOrderData.quantity}
                onChange={(e) => setUpdatedOrderData({ ...updatedOrderData, quantity: e.target.value })}
              />
              <TextField
                label="Supplier Name"
                fullWidth
                margin="normal"
                name="supplierName"
                value={updatedOrderData.supplierName}
                onChange={(e) => setUpdatedOrderData({ ...updatedOrderData, supplierName: e.target.value })}
              />
              <TextField
                label="Unit Price"
                fullWidth
                margin="normal"
                name="unitPrice"
                value={updatedOrderData.unitPrice}
                onChange={(e) => setUpdatedOrderData({ ...updatedOrderData, unitPrice: e.target.value })}
              />
              <TextField
                label="Delivery Charges"
                fullWidth
                margin="normal"
                name="deliveryCharges"
                value={updatedOrderData.deliveryCharges}
                onChange={(e) => setUpdatedOrderData({ ...updatedOrderData, deliveryCharges: e.target.value })}
              />
              <TextField
                select
                label="Status"
                fullWidth
                margin="normal"
                name="status"
                value={updatedOrderData.status}
                onChange={(e) => setUpdatedOrderData({ ...updatedOrderData, status: e.target.value })}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
              </TextField>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateOrder} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;

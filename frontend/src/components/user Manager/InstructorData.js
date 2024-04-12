import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Table, FormControl } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';

const CustomerData = () => {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/');
        const filteredUsers = response.data.user.filter(user =>
          user.role === 'Instructor' &&
          (user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.gender.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setUser(filteredUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [searchTerm]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure that you wanted to delete that user record")) {
      try {
        await axios.delete(`/${id}`);
        setUser(user.filter(user => user._id !== id)); // Remove the deleted user from the state
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: 'Instructor Details',
    onAfterPrint: () => alert('Instruction Details Printed Successfully!')
  });

  return (
    <div>
      <p style={{ textAlign: 'center', paddingTop: '20px', fontSize: '42px', fontStyle: 'bold' }}>Instructor Details</p>
      <div style={{ padding: '10px 40px 10px 40px' }}>
        <FormControl
          type="text"
          placeholder="Search by email, NIC, name, number, role, or gender"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
      </div>
      <div style={{ padding: '0px 40px 10px 40px' }} ref={ComponentsRef}>
        <Table striped>
          <thead>
            <tr>
              <th>Email</th>
              <th>NIC</th>
              <th>Name</th>
              <th>Number</th>
              <th>Role</th>
              <th>Gender</th>
              
            </tr>
          </thead>
          <tbody>
            {user && user.map((users, index) => (
              <tr key={index}>
                <td>{users.email}</td>
                <td>{users.nic}</td>
                <td>{users.name}</td>
                <td>{users.number}</td>
                <td>{users.role}</td>
                <td>{users.gender}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(users._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Button variant="success" onClick={handlePrint}>Generate Reports</Button>
      </div>
    </div>
  );
}

export default CustomerData;

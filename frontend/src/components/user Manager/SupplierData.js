import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

const CustomerData = () => {
  
const [user, setUser] = useState([]);

useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get('/');
      const filteredUsers = response.data.user.filter(user =>user.role==='Supplier');
      setUser(filteredUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  fetchData();
}, []);
/*In this approach:

We define an asynchronous function named fetchData using the async keyword.
Inside fetchData, we use await to wait for the axios.get() call to resolve. This makes the code look more synchronous and easier to read compared to using .then() and .catch() chains.
If the API call is successful, we set the user state using setUser(response.data.user).
If an error occurs during the API call, it's caught in the catch block, and an error message is logged to the console.
This async/await approach offers a cleaner and more concise syntax for handling asynchronous operations compared to using traditional promise chaining with .then() and .catch().





*/ 
const deleteHandler = async (id) => {
   if( window.confirm("Are you sure that you wanted to delete that user record")){
    try {
      await axios.delete(`/${id}`);
      setUser(user.filter(user => user._id !== id)); // Remove the deleted user from the state
    } catch (error) {
      console.error('Error deleting user:', error);
    }
}
  };


  return (
    <div>
      <p style={{textAlign:'center',paddingTop:'20px',fontSize:'42px',fontStyle:'bold'}}>Supplier Details</p>
      <div style={{ padding: '40px 40px 10px 40px' }} >
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
        {
               user && user.map((users,index)=>{
                    return  <tr key ={index} >
                    <td>{users.email}</td>
                    <td>{users.nic}</td>
                    <td>{users.name}</td>
                    <td>{users.number}</td>
                    <td>{users.role}</td>
                    <td>{users.gender}</td>
                    <td> <Button variant="danger" onClick={() => deleteHandler(users._id)}>Delete</Button>{' '}</td>
                    
                    
                  </tr>
                })
            }
       
        </tbody>
      
      <tbody>
     
      </tbody>
    </Table>
    </div>
    </div>
  )
}

export default CustomerData

import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import './trainingupdate.css'

function UpdateTraining(){
    const { id } = useParams();
    const [updateorder,setupdateorder]=useState({
      name:"",
      email:"",
      date:"",
      time:"",
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:8020/order_training/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
                setupdateorder(data.data);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);



      const handleInputChange = (e) => {
        setupdateorder({
          ...updateorder,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`http://localhost:8020/update_training`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updateorder._id,
              ...updateorder,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            console.log('Order updated successfully');
           alert("Order updated successfully");

          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    return(
        <div className='order-update'>

<h2> Update Details</h2><br></br>
    <lable>Name:</lable>
    <input type="text" id="name" name="name"   onChange={handleInputChange} value={updateorder?.name }/><br></br>
    <lable>Email:</lable>
    <input type="text" id="email" name="email"  onChange={handleInputChange} value={updateorder?.email }/><br></br>
    <lable>Date:</lable>
    <input type="date" id="date" name="date"  onChange={handleInputChange} value={updateorder?.date }/><br></br> 
    <lable>Time:</lable>
    <input type="time" id="time" name="time"  onChange={handleInputChange} value={updateorder?.time }/><br></br> 

    <button onClick={handleUpdate} >Update</button><br></br> <br></br> 
  
 
        </div>
    )
}
export default UpdateTraining;
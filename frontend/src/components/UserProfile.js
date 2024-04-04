import axios from 'axios';
import React, { useEffect, useState } from 'react'
//import { useParams } from 'react-router-dom';

const UserProfile = ({id}) => {

   const[user,setUser] = useState(null)
   
    useEffect(()=>{

      const fetchUser = async ()=>{
        try{
          const response = await axios.get(`/getUser/${id}`);
          setUser(response.data.user);
        }catch(error){
          console.error()
        }
      }

      
        
        fetchUser()

       },[id])

   
   
  return (
    <div>
   
 
 {user && <p>Email:{user.email}</p>}
    </div>
  )
}

export default UserProfile

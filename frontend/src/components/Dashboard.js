import axios from 'axios'
import React, { useEffect, useState } from 'react'



const Dashboard = () => {

  const [message,setMessage] =useState()
  useEffect(()=>{
    axios.get('/dashboard')
    .then(res =>{
      if(res.data.valid){

        setMessage(res.data.message)
      
      }
    })
    .catch(err => console.log(err))
  })

   
  return (
    <div>
      
   <h2>dashboard.{message}</h2>

      
    </div>
  )
}

export default Dashboard

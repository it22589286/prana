import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Supplier = () => {
  const [userName,setUserName] =useState()
  useEffect(()=>{
    axios.get('/dashboard')
    .then(res =>{
      if(res.data.valid){

        setUserName(res.data.userName)
      
      }
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div>
        supplier{userName}
      
    </div>
  )
}

export default Supplier

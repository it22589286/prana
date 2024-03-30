import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Supplier = () => {
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
        supplier{message}
      
    </div>
  )
}

export default Supplier

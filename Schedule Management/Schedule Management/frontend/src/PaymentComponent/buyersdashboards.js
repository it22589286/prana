import { useEffect, useState } from 'react'
import axios from "axios"
import './buyerdashboard.css'



function BuyersDashboard(){
    const [countlist,setcountlist]=useState([]);
    const [customerlist,setcustomerlist]=useState([]);


//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:8000/count_payment")
   const { count } = data.data;
   setcountlist(count);//get count
   setcustomerlist(data.data.data);//get table data
 
}catch(err){
    alert(err)
}
}
useEffect(()=>{
    getfetchdata()   
},[])





    
return(
    <div>
           <div className='values'>

           
          
</div><br></br>
<div className='buyerdashboard'>
    <p className='total-display'> 
  <h3 >Total Payment Details:</h3>
            {countlist !== null ? (
                <p>Total Payment Details : {countlist}
               
              
                </p>
                
            ) : (
                <p>Loading...
                     </p>
          
               
            )}
</p>
<h3>Recent  Orders :</h3>
 

    

                  
                         <table>
                            <tr>
                            <th>Users</th>
                            <th>Bank</th>
                            <th>Payment Total Netincome</th>
                         
                            </tr>
<tbody>
{
  customerlist.map((e) => {
    return (
      <tr>
        <td>{e.usename}</td>
        <td>{e.card_holder}</td>
        <td>
          {e.pay <= 5000 ? ( // Using ternary operator for conditional rendering
            e.pay * 5 / 100
          ) : (
            e.pay * 10 / 100
          )}
        </td>
      
      </tr>
    );
  })
}

                            </tbody>
                        </table>
                        
            
              

                     
                    
                
                
          
                        </div>  

    </div>
)




}
export default BuyersDashboard;
import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import './trainingdetails.css';
import { useReactToPrint } from "react-to-print";

function TrainingDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [searchkey, setsearchkey] = useState('');

    // Read
    const getfetchdata = async () => {
        try {
            const data = await axios.get("http://localhost:8000/_training");
            console.log(data.data.success);
            if (data.data.success) {
                setshowdiscounts(data.data.data);
            }
        } catch (err) {
            alert(err);
        }
    }

    useEffect(() => {
        getfetchdata();
    }, []);

    // Delete
    const handledelete = async (id) => {
        const data = await axios.delete(`http://localhost:8000/delete_training/${id}`);
        if (data.data.success) {
            getfetchdata();
            console.log(data.data.message);
            alert("Order item deleted Successfully!");
        }
    }

    // Generate PDF
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "show services",
        onAfterPrint: () => alert("data save in pdf")
    });

    // Search
    const handlesearch = () => {
        filterdata(searchkey);
    }

    const filterdata = (searchKey) => {
        const filteredData = showdiscounts.filter(customer =>
            customer.name.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    }

    return (
        <div className="showorders">
            <h2>Training Schedule Time Table</h2>
            <div className='searchbtn'>
                <input type="search" onChange={(e) => setsearchkey(e.target.value)} placeholder='Search' className='in' />
                <button id='search-btn' onClick={handlesearch}>Search</button>
            </div>
            <div ref={componentPDF} style={{ width: '100%' }}>
                <br /><br /><br />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            showdiscounts.map((e1) => {
                                return (
                                    <tr key={e1._id}>
                                        <td>{e1.name}</td>
                                        <td>{e1.email}</td>
                                        <td>{e1.date}</td>
                                        <td>{e1.time}</td>
                                        <td>
                                            <a href={`/updatetraining/${e1._id}`}>Edit Details</a>
                                            <button onClick={() => handledelete(e1._id)}>Delete Details</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <br /><br /><br /><br />
            <button onClick={generatePDF}>Download Report</button>
        </div>
    )
}
export default TrainingDetails;

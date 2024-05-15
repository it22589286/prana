import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './trainingdetails.css'; // Import your CSS file
import { useReactToPrint } from 'react-to-print';

function TrainingDetails() {
    // State variables
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [searchkey, setsearchkey] = useState('');

    // Function to fetch data
    const getfetchdata = async () => {
        try {
            const data = await axios.get("http://localhost:8000/api/training/_training");
            if (data.data.success) {
                setshowdiscounts(data.data.data);
            }
        } catch (err) {
            alert(err);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        getfetchdata();
    }, []);

    // Function to delete an item
    const handledelete = async (id) => {
        const data = await axios.delete(`http://localhost:8000/api/training/delete_training/${id}`);
        if (data.data.success) {
            getfetchdata();
            console.log(data.data.message);
            alert("Order item deleted Successfully!");
        }
    };

    // Function to generate PDF
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "show services ",
        onAfterPrint: () => alert("data save in pdf")
    });

    // Function to handle search
    const handlesearch = (e) => {
        filterdata(e.target.value);
    };

    // Function to filter data based on search key
    const filterdata = (searchKey) => {
        const filteredData = showdiscounts.filter(customer =>
            customer.name.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    };

    // JSX to render the component
    return (
        <div className="body-background">
            <div className="showorders">
                <h2>Training Schedule Time Table</h2>
                <div className='searchbtn'>
                    <input type="search" onChange={handlesearch} placeholder='search' className='in' />
                    <button id='search-btn' onClick={handlesearch}> Search </button>
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
                            {showdiscounts.map((e1) => (
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
                            ))}
                        </tbody>
                    </table>
                </div>
                <br /><br /><br />
                <button onClick={generatePDF}>Download Report</button>
            </div>
        </div>
    );
}

export default TrainingDetails;

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './trainingdetails.css';
import { useReactToPrint } from 'react-to-print';

function TrainingReqDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [searchkey, setsearchkey] = useState('');

    // Read
    const getfetchdata = async () => {
        try {
            const data = await axios.get('http://localhost:8000/_training');
            if (data.data.success) {
                setshowdiscounts(data.data.data);
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    // Accept
    const handleaccept = async (id) => {
        alert('Accepted!');
    };

    // Delete
    const handledelete = async (id) => {
        const data = await axios.delete('http://localhost:8000/delete_training/' + id);
        if (data.data.success) {
            getfetchdata();
            alert('Request deleted Successfully!');
        }
    };

    // Generate PDF
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'show services',
        onAfterPrint: () => alert('Data saved in PDF')
    });

    // Search
    const handlesearch = (e) => {
        filterdata(searchkey);
    };

    const filterdata = (searchKey) => {
        const filteredData = showdiscounts.filter(customer =>
            customer.r_type && customer.r_type.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    };

    return (
        <div className="showorders">
            <h2>Request Details</h2>
            <div className='searchbtn'>
                <input
                    type="search"
                    onChange={(e) => setsearchkey(e.target.value)}
                    placeholder='search'
                    className='in'
                />
                <button id='search-btn' onClick={handlesearch}>Search</button>
            </div>
            <div ref={componentPDF} style={{ width: '100%' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Request Type</th>
                            <th>Details</th>
                            <th className="action-header">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showdiscounts.map((e1) => (
                            <tr key={e1._id}>
                                <td>{e1.r_type}</td>
                                <td>
                                    Name: {e1.name}<br />
                                    Email: {e1.email}<br />
                                    Date: {e1.date}<br />
                                    Time: {e1.time}
                                </td>
                                <td className="action-cell">
                                    <button id="acceptbtn" onClick={() => handleaccept(e1._id)}>Accept</button>
                                    <span style={{ marginRight: '10px' }}></span>
                                    <button onClick={() => handledelete(e1._id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br /><br /><br /><br />
            <button onClick={generatePDF}>Download Report</button>
        </div>
    );
}

export default TrainingReqDetails;

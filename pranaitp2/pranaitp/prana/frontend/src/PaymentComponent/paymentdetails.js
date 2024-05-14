import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './orderdetails.css';
import { useReactToPrint } from 'react-to-print';

function PaymentDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [searchkey, setsearchkey] = useState('');

    // Read
    const getfetchdata = async () => {
        try {
            const data = await axios.get('http://localhost:8020/_payment');
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

    // Delete
    const handledelete = async (id) => {
        const data = await axios.delete('http://localhost:8020/delete_payment/' + id);
        if (data.data.success) {
            getfetchdata();
            alert('Payment deleted successfully!');
        }
    };

    // Generate PDF
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: 'Payment Report',
        onAfterPrint: () => alert('Data saved in PDF')
    });

    // Search
    const handlesearch = (e) => {
        filterdata(searchkey);
    };

    const filterdata = (searchKey) => {
        const filteredData = showdiscounts.filter(customer =>
            customer.usename && customer.usename.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    };

    return (
        <div className="showorders">
            <div className='searchbtn'>
                <input
                    type="search"
                    onChange={(e) => setsearchkey(e.target.value)}
                    placeholder='Search'
                    className='in'
                />
                <button id='search-btn' onClick={(e) => handlesearch(e)}>Search</button>
            </div>
            <div ref={componentPDF} style={{ width: '100%' }}>
                <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Payment Method</th>
                            <th>Card Type</th>
                            <th>Card Holder</th>
                            <th>Card Number</th>
                            <th>Expire Date</th>
                            <th>CVC</th>
                            <th>Pay Details</th>
                            <th className="action-header">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showdiscounts.map((e1) => (
                            <tr key={e1._id}>
                                <td>{e1.usename}</td>
                                <td>{e1.type}</td>
                                <td>{e1.card_type}</td>
                                <td>{e1.card_holder}</td>
                                <td>{e1.card_number}</td>
                                <td>{e1.expir_date}</td>
                                <td>{e1.cvc}</td>
                                <td>{e1.pay}</td>
                                <td className="action-cell">
                                    <button onClick={() => handledelete(e1._id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={generatePDF}>Get Payment Report</button>
        </div>
    );
}

export default PaymentDetails;

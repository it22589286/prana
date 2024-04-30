import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Table, Skeleton, Button, Input } from "antd";
import { useReactToPrint } from 'react-to-print';

const { Search } = Input;

const Feedbacks = () => {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      title: "Reviewer's Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Reviewer's Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
  ];

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/feedbacks");
      setFeedbacks(response.data.feedbacks);
    } catch (err) {
      console.error("Error fetching feedbacks: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

 // const handleGenerateReport = () => {
    // Logic to generate the report goes here
   // console.log("Generating report...");
 // };

 //report generate function
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: 'Instructor Details',
    onAfterPrint: () => alert('Instruction Details Printed Successfully!')
  });

  //search function
  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ minHeight: "80vh", padding: 32 }} ref={ComponentsRef}>
      <h1>Feedbacks</h1>
      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by reviewer's name"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <Table
          dataSource={filteredFeedbacks}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      )}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button type="primary" onClick={handlePrint}> 
          Generate Report
        </Button>
       
      </div>
    </div>
  );
};

export default Feedbacks;

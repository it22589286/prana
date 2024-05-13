import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/leave/get");
        setLeaves(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeaves();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/leaveform">
      <Button variant="primary" size="lg">
        Leave Form
      </Button>
      </Link>
      <div className="container">
        <table className="table table-striped table-bordered table-hover mt-2">
          <thead className="table-dark text-center">
            <tr>
              <th>Employee ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Leave Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td className="text-center">{leave.empID}</td>
                <td className="text-center">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="text-center">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="text-center">{leave.leaveType}</td>
                <td className="text-center">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const LeaveManagerScreen = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/leave/get');
        setLeaves(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLeaves();
  }, []);

  useEffect(() => {
    setFilteredLeaves(
      leaves.filter((leave) =>
        leave.empID.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, leaves]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setFilteredLeaves(
      leaves.filter((leave) =>
        leave.empID.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  };

  const handleApprove = async (id) => {
    try {
      const leave = { status: 'Approved' };
      await axios.put(`http://localhost:8000/api/leave/update/${id}`, leave);
      alert('Leave Request Approved');
      updateLeaveStatus(id, 'Approved');
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const leave = { status: 'Rejected' };
      await axios.put(`http://localhost:8000/api/leave/update/${id}`, leave);
      alert('Leave Request Rejected');
      updateLeaveStatus(id, 'Rejected');
    } catch (err) {
      console.error(err);
    }
  };

  const updateLeaveStatus = (id, status) => {
    setLeaves((prevLeaves) =>
      prevLeaves.map((leave) =>
        leave._id === id ? { ...leave, status } : leave
      )
    );
  };

  const handleUpdate = (id) => {
    window.location.href = `/updateleave/${id}`;
  };

  const handleGenerateReport = async () => {
    try {
      const doc = new jsPDF();
  
      const formattedLeaves = leaves.map((leave) => [
        leave.empID,
        new Date(leave.startDate).toLocaleDateString(), 
        new Date(leave.endDate).toLocaleDateString(), 
        leave.leaveType,
        leave.status,
      ]);
  
      doc.autoTable({
        head: [['Employee ID', 'Start Date', 'End Date', 'Leave Type', 'Status']],
        body: formattedLeaves,
      });
      doc.save('leaves.pdf');
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div>
      
        <div className="d-flex justify-content-center mt-5">
    <input
        type="text"
        className=" form-control mt-3 w-50 mb-3"
        placeholder="Search by Employee ID"
        value={searchInput} 
        onChange={handleSearchInputChange} 
    />

    <button
        className="btn btn-primary mt-3"
        onClick={handleGenerateReport}
    >
        Generate Report
    </button>
    </div>

      <div className="container mt-3">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Employee Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Leave Type</th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {filteredLeaves.map((leave) => (
  <tr key={leave._id}>
    <td className="text-center">{leave.empID}</td>
    <td className="text-center">
      {new Date(leave.startDate).toLocaleDateString()}
    </td>
    <td className="text-center">
      {new Date(leave.endDate).toLocaleDateString()}
    </td>
    <td className="text-center">{leave.leaveType}</td>
    <td className="text-center">
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success"
          onClick={() => handleApprove(leave._id)}
          disabled={leave.status === 'Approved' || leave.status === 'Rejected'} // Disable if status is not "Pending"
        >
          Approve
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleReject(leave._id)}
          disabled={leave.status === 'Approved' || leave.status === 'Rejected'} // Disable if status is not "Pending"
        >
          Reject
        </button>
        <button
          className="btn btn-warning"
          onClick={() => handleUpdate(leave._id)}
          disabled={leave.status === 'Approved' || leave.status === 'Rejected'}
        >
          Update
        </button>
      </div>
    </td>
    <td className="text-center">{leave.status}</td>
  </tr>
))}


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagerScreen;

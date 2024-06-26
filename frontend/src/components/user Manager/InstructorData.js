import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Table, FormControl, ButtonGroup } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

const CustomerData = () => {
  const [user, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/");
        const filteredUsers = response.data.user.filter(
          (user) =>
            user.role === "Instructor" &&
            (user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.attendance.toString().includes(searchTerm.toLowerCase()))
        );
        setUser(filteredUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [searchTerm]);

  const deleteHandler = async (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that user record")
    ) {
      try {
        await axios.delete(`/${id}`);
        setUser(user.filter((user) => user._id !== id)); // Remove the deleted user from the state
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Instructor Details",
    onAfterPrint: () => alert("Instruction Details Printed Successfully!"),
  });

  const IncrementAttendance = async (id) => {
    try {
      // Fetch the user from the state based on the id
      const currentUser = user.find((user) => user._id === id);
      //Increment attendance by1

      let newAttendance = currentUser.attendance + 1;
      //If the new attendace is greater than 30, set it to 0
      if (newAttendance > 30) {
        const confirmReset = window.confirm(
          "Attendance is reaching 30. Do you want to reset it to 0?"
        );

        if (confirmReset) {
          newAttendance = 0;
        }
      }
      //Update the attendance

      await axios.put(`/updateAttendance/${id}`, { attendance: newAttendance });
      setUser(
        user.map((user) =>
          user._id === id ? { ...user, attendance: newAttendance } : user
        )
      );
    } catch (error) {
      console.error("Error incrementing attendance:", error);
    }
  };
  const DecrementAttendance = async (id) => {
    try {
      const currentUser = user.find((user) => user._id === id);

      let deccreaseAttendance = currentUser.attendance - 1;

      if (deccreaseAttendance < 0) {
        deccreaseAttendance = 0;
      }

      await axios.put(`/updateAttendance/${id}`, {
        attendance: deccreaseAttendance,
      });
      setUser(
        user.map((user) =>
          user._id === id ? { ...user, attendance: deccreaseAttendance } : user
        )
      );
    } catch (error) {
      console.error("Error decrementing attendance:", error);
    }
  };

  return (
    <div>
      <p
        style={{
          textAlign: "center",
          paddingTop: "20px",
          fontSize: "42px",
          fontStyle: "bold",
        }}
      >
        <b>Instructor Details</b>
      </p>
      <div style={{ padding: "10px 40px 10px 40px" }}>
        <FormControl
          type="text"
          placeholder="Search by email, NIC, name, number, role, or gender"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
      </div>
      <div style={{ padding: "0px 40px 10px 40px" }} ref={ComponentsRef}>
        <Table striped>
          <thead>
            <tr>
              <th>Email</th>
              <th>NIC</th>
              <th>Name</th>
              <th>Number</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {user &&
              user.map((users, index) => (
                <tr key={index}>
                  <td>{users.email}</td>
                  <td>{users.nic}</td>
                  <td>{users.name}</td>
                  <td>{users.number}</td>
                  <td>{users.role}</td>
                  <td>{users.gender}</td>
                  <td>{users.attendance}</td>
                  <td colSpan="3" className="text-center">
                    <ButtonGroup>
                      <Button
                        variant="warning"
                        onClick={() => IncrementAttendance(users._id)}
                      >
                        +
                      </Button>{" "}
                      <Button
                        variant="warning"
                        onClick={() => DecrementAttendance(users._id)}
                      >
                        -
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(users._id)}
                      >
                        {" "}
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          marginRight: "150px",
        }}
      >
        <Button variant="success" onClick={handlePrint}>
          Generate Reports
        </Button>
      </div>
    </div>
  );
};

export default CustomerData;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Image5 from "./imagefiles/userprofile.jpg";
import { toast } from "react-hot-toast";
//import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const id = userData["_id"];
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/getUser/${id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error();
      }
    };

    fetchUser();
  }, [id]);

  const deleteHandler = async (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that user record")
    ) {
      try {
        await axios.delete(`/${id}`);
        toast.success("Account deleted Successfully");

        logout();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${Image5})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          style={{
            width: "36rem",
            height: "30rem",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              {user && <p>{user.name}`s Profile</p>}{" "}
            </Card.Title>

            {user && <p>Name:{user.name}</p>}
            {user && <p>Email:{user.email}</p>}
            {user && <p>NIC:{user.nic}</p>}
            {user && <p>Contact No:{user.number}</p>}
            {user && <p>Gender:{user.gender}</p>}
            {user && <p>Role:{user.role}</p>}

            <div className="d-flex  flex-column ">
              <Button
                variant="primary"
                className="flex-grow-1  mb-2 mt-5 mx-2"
                onClick={() => navigate("/updateuser")}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="flex-grow-1 mx-2"
                onClick={() => deleteHandler(user._id)}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag } from "antd";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [instructorAverages, setInstructorAverages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/feedbacks");
      setFeedbacks(response.data.feedbacks);
      calculateAverageRatings(response.data.feedbacks);
    } catch (err) {
      console.error("Error fetching feedbacks: ", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRatings = (feedbacks) => {
    const ratings = {};
    feedbacks.forEach((feedback) => {
      const instructorId = feedback.instructor._id;
      ratings[instructorId] = ratings[instructorId] || [];
      ratings[instructorId].push(feedback.rating);
    });

    const averages = Object.keys(ratings).map((id) => {
      const average =
        ratings[id].reduce((acc, curr) => acc + curr, 0) / ratings[id].length;
      return {
        instructorId: id,
        name: feedbacks.find((f) => f.instructor._id === id).instructor.name,
        averageRating: average.toFixed(1),
      };
    });

    setInstructorAverages(averages);
  };

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
      render: (rating) => <Tag color="blue">{rating}</Tag>,
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
  ];

  const averageColumns = [
    {
      title: "Instructor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Average Rating",
      dataIndex: "averageRating",
      key: "averageRating",
      render: (rating) => <Tag color="green">{rating}</Tag>,
    },
  ];

  return (
    <div style={{ padding: 32 }}>
      <h2>Feedbacks</h2>
      <Table
        columns={columns}
        dataSource={feedbacks}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      <h2>Instructor Average Ratings</h2>
      <Table
        columns={averageColumns}
        dataSource={instructorAverages}
        rowKey="instructorId"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Feedback;

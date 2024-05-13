import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Skeleton,
  Space,
  Rate,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Select,
  Input, //various components and utilities from the Ant Design library
} from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Option } = Select;
const MyFeedbacks = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/feedbacks");
      const id = JSON.parse(localStorage.getItem("user"))["_id"];
      setFeedbacks(
        response.data.feedbacks.filter((feedback) => {
          console.log(feedback);
          return feedback.userId === id;
        })
      );
    } catch (err) {
      console.error("Error fetching feedbacks: ", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/feedbacks/${id}`);
      await fetchFeedbacks();
      message.success("Feedback deleted successfully");
    } catch (err) {
      message.error("Failed to delete feedback");
    }
  };

  const fetchInstructors = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/users`);
      const instructors = result.data["user"].filter(
        (user) => user.role === "Instructor"
      );
      setInstructors(instructors);
    } catch (error) {}
  };

  const showEditModal = (feedback) => {
    setCurrentFeedback(feedback);
    form.setFieldsValue({
      instructor: feedback.instructor,
      feedback: feedback.feedback,
      rating: feedback.rating,
    });
    setIsModalVisible(true);
  };

  const handleEdit = async (values) => {
    try {
      await axios.put(
        `http://localhost:8000/api/feedbacks/${currentFeedback._id}`,
        values
      );
      await fetchFeedbacks();
      setIsModalVisible(false);
      message.success("Feedback updated successfully");
    } catch (err) {
      message.error("Failed to update feedback");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchFeedbacks();
    fetchInstructors();
  }, []);

  return (
    <div style={{ minHeight: "80vh", padding: 32 }}>
      <Button
        onClick={() => {
          navigate("/fed");
        }}
      >
        Add Feedback
      </Button>
      {loading ? (
        <Skeleton active />
      ) : (
        <Space direction="horizontal" style={{ width: "100%" }}>
          {feedbacks.map((feedback) => (
            <Card
              onLoad={() => {
                setTimeout(() => {
                  const cards = document.querySelectorAll(".card-item");
                  cards.forEach((card) => card.classList.add("loaded"));
                }, 100);
              }}
              key={feedback._id}
              style={{ width: 300 }}
            >
              <Meta
                title={`Instructor: ${feedback.instructor?.name}`}
                description={`Feedback: ${feedback.feedback}`}
              />
              <div style={{ marginTop: 16 }}>
                <Rate defaultValue={feedback.rating} disabled />
              </div>
              <div style={{ marginTop: 16 }}>
                <Button type="primary" onClick={() => showEditModal(feedback)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure you want to delete this feedback?"
                  onConfirm={() => deleteFeedback(feedback._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger style={{ marginLeft: 8 }}>
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            </Card>
          ))}
        </Space>
      )}

      <Modal
        title="Edit Feedback"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleEdit} layout="vertical">
          <Form.Item
            name="instructor"
            label="Instructor"
            rules={[
              { required: true, message: "Please select an instructor!" },
            ]}
          >
            <Select placeholder="Select an instructor">
              {instructors.map((instructor) => (
                <Option value={instructor._id}>{instructor.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="feedback"
            label="Feedback"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
            <Rate />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyFeedbacks;

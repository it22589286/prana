import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

const StarIcon = ({ selected, onSelect }) => {
  return (
    <span
      className={`text-xl cursor-pointer ${
        selected ? "text-yellow-500" : "text-gray-400"
      }`}
      onClick={onSelect}
    >
      &#9733;
    </span>
  );
};

const GiveFeedbacks = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [selectedStars, setSelectedStars] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    instructor: "",
    rating: 0,
    feedback: "",
  });
  const handleStarSelect = (rating) => {
    setSelectedStars(rating);
    setFormData({
      ...formData,
      rating: rating,
    });
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"; //entered email address is in a valid format
    }
    if (!formData.instructor.trim()) {
      errors.instructor = "Instructor selection is required";
    }
    if (formData.rating === 0) {
      errors.rating = "Rating is required";
    }
    if (!formData.feedback.trim()) {
      errors.feedback = "Feedback is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //Form Submission Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))["_id"];
        const response = await axios.post(
          "http://localhost:8000/api/feedbacks",
          {
            ...formData,
            name: formData.fullName,
            userId: userId,
          }
        );

        console.log(response.data);
        setFormData({
          fullName: "",
          email: "",
          instructor: "",
          rating: 0,
          feedback: "",
        });
        setSelectedStars(0);
        message.success("Feedback sent successfully");
        navigate("/feedbacks");
      } catch (error) {
        console.error("Error creating feedback:", error);
      }
    } else {
      console.log("bit");
    }
  };

  const fetchUsers = async () => {
    try {
      const result = await axios.get(`http://localhost:8000/api/users`);
      const instructors = result.data["user"].filter(
        (user) => user.role === "Instructor" //cn
      );
      setInstructors(instructors);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section
      className="py-8"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-black bg-opacity-50  p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl text-gray-100 font-semibold mb-6">
            Give your Feedback
          </h2>
          <form onSubmit={handleFormSubmit} method="POST">
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block  text-gray-200 text-sm font-semibold mb-2"
              >
                Full name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                style={{ backgroundColor: "transparent" }}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg text-gray-100 focus:outline-none focus:border-blue-500 ${
                  errors.fullName ? "border-red-500" : ""
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-200 text-sm font-semibold mb-2"
              >
                E-mail
              </label>
              <input
                type="email" //validation
                style={{ backgroundColor: "transparent" }}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg text-gray-100 focus:outline-none focus:border-blue-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="instructor"
                className="block text-gray-200 text-sm font-semibold mb-2"
              >
                Select your instructor
              </label>
              <select
                id="instructor"
                name="instructor"
                style={{ backgroundColor: "transparent", color: "black" }}
                value={formData.instructor}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg text-gray-100 focus:outline-none focus:border-blue-500 ${
                  errors.instructor ? "border-red-500" : ""
                }`}
              >
                <option value="">Select</option>
                {instructors.map((instructor) => (
                  <option value={instructor._id} key={instructor._id}>
                    {instructor?.name}
                  </option>
                ))}
              </select>
              {errors.instructor && (
                <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-200 text-sm font-semibold mb-2">
                Rate your Yoga Instructor
              </label>
              <div>
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    selected={index < selectedStars}
                    onSelect={() => handleStarSelect(index + 1)}
                  />
                ))}
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
              )}
            </div>
            <div className="mb-8">
              <label
                htmlFor="feedback"
                className="block text-gray-200 text-sm font-semibold mb-2"
              >
                Your feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                style={{ backgroundColor: "transparent" }}
                value={formData.feedback}
                onChange={handleChange}
                className={`w-full h-32 px-4 py-2 border rounded-lg text-gray-100  focus:outline-none focus:border-blue-500 ${
                  errors.feedback ? "border-red-500" : ""
                }`}
              ></textarea>
              {errors.feedback && (
                <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="submit" //vv
                className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setFormData({
                    fullName: "",
                    email: "",
                    instructor: "",
                    rating: 0,
                    feedback: "",
                  });
                  setSelectedStars(0);
                }}
                type="reset"
                className="px-4 py-2 font-medium text-gray-600 bg-transparent hover:bg-gray-100 rounded transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GiveFeedbacks;

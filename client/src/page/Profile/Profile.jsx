// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import "./Profile.scss"; // الملف الخاص بالتنسيق باستخدام SCSS

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    newPassword: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // استخدام التوكن من ال localStorage
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }

        const data = await response.json();
        setUserData(data);
        setFormData({
          name: data.name,
          email: data.email,
          number: data.number,
        });
      } catch (err) {
        setError("Failed to fetch profile data.");
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // استخدام التوكن من ال localStorage
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setError("Profile updated successfully");
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Phone Number</label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Current Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;

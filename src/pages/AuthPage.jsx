import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ownerLoginThunk, ownerRegisterThunk } from "../redux/actions/ownerAuthAction";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.ownerAuth || {});
  const loading = status === "loading";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, phone, email, password } = formData;

    // ✅ Get userId from localStorage (must be set after user login)
    const userId = localStorage.getItem("userId");

    if (!userId && !isLogin) {
      alert("Please login as a user first to register as owner.");
      return;
    }

    try {
      if (isLogin) {
        await dispatch(ownerLoginThunk({ phone, password })).unwrap();
      } else {
        await dispatch(
          ownerRegisterThunk({
            username,
            phone,
            email,
            password,
            userId,
            type: "owner",
          })
        ).unwrap();
      }

      onClose(); // Close modal
      navigate("/dashboard"); // Redirect after login/register
    } catch (err) {
      console.error("Auth Error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isLogin ? "Owner Login" : "Owner Register"}
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          )}

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          {!isLogin && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default AuthModal;

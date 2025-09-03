
import { useState } from "react";
import img from "../assets/nature.webp";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineLoading3Quarters, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";


export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "", 
    email: "",
    otp: "",
  });

  const [showOtp, setShowOtp] = useState(false);

  const handleGetOtp = async (e) => {
    e.preventDefault();

    if (form.name && form.dateOfBirth && form.email) {
      console.log("Form Data:", form);
    } else {
      return toast.error("All fields are required.");
    }

    try {
      const res = await axios.post(
        "/api/auth/signup",
        {
          name: form.name,
          dateOfBirth: form.dateOfBirth, 
          email: form.email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;
      console.log("Signup response:", data);

      if (data?.error) {
        throw new Error(data.error);
      }

      toast.success(data.message || "OTP sent successfully");
      setShowOtp(true); 
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const handleSignUp = async(e) => {
    e.preventDefault();
    console.log("Signing up with:", form);
    try {
        const res = await axios.post(
        "/api/otp/verifyOtp",
        {
          name: form.name,
          dateOfBirth: form.dateOfBirth, 
          email: form.email,
          otp:form.otp
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;
      console.log("Signin response:", data);

      if (data?.error) {
        throw new Error(data.error);
      }
      toast.success("Signup successfull")
        
    } catch (error) {
        return toast.error(error.message)
        
    }
    setForm({
      name: "",
      dateOfBirth: "",
      email: "",
      otp: "",
    });
    setShowOtp(false);
  };

  return (
    <div className="min-h-screen flex rounded-lg overflow-hidden bg-white shadow-md max-w-5xl mx-auto my-10">
      {/* Left Form Section */}
      <div className="flex flex-col justify-center px-10 py-8 w-full md:w-1/2">
        {/* Logo and Heading */}
        <div className="flex items-center space-x-2 mt-0">
                  <AiOutlineLoading3Quarters className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold">HD</span>
                </div>

        <h1 className="text-3xl font-semibold mb-1 text-black text-left">
          Sign up
        </h1>
        <p className="text-gray-500 mb-8 text-left">
          Sign up to enjoy the feature of HD
        </p>

        {/* Form */}
        <form className="flex flex-col space-y-6 w-full max-w-md text-left">
          <label className="flex flex-col text-xs text-gray-500 font-medium">
            Your Name
            <input
              type="text"
              placeholder="Jonas Khanwald"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </label>

          <label className="flex flex-col text-xs text-gray-500 font-medium">
            Date of Birth
            <input
              type="date"
              value={form.dateOfBirth} 
              onChange={(e) =>
                setForm({ ...form, dateOfBirth: e.target.value })
              }
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </label>

          <label className="flex flex-col text-xs text-gray-500 font-medium">
            Email
            <input
              type="email"
              placeholder="jonas_kahnwald@gmail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </label>

          
          {showOtp && (
            <label className="flex flex-col text-xs text-gray-500 font-medium">
              Enter OTP
              <input
                type="text"
                placeholder="Enter OTP here"
                value={form.otp}
                onChange={(e) => setForm({ ...form, otp: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </label>
          )}

        
          {!showOtp ? (
            <button
              onClick={handleGetOtp}
              className="bg-blue-600 text-white rounded-md py-3 mt-2 font-semibold hover:bg-blue-700 transition w-full"
            >
              Get OTP
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className="bg-green-600 text-white rounded-md py-3 mt-2 font-semibold hover:bg-green-700 transition w-full"
            >
              Sign Up
            </button>
          )}
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8 font-bold">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline hover:text-blue-700">
            Sign in
          </Link>
        </p>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block w-1/2 overflow-hidden rounded-r-lg">
        <img
          src={img}
          alt="Blue abstract waves"
          className="w-full h-full object-cover rounded-r-lg"
        />
      </div>
    </div>
  );
}


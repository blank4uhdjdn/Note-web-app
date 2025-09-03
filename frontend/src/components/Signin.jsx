// import React, { useState } from "react";
// import img from "../assets/nature.webp";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { AiOutlineLoading3Quarters, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [showOtpField, setShowOtpField] = useState(false);
//   const [showOtp, setShowOtp] = useState(false);
//   const [keepLoggedIn, setKeepLoggedIn] = useState(false);

//   const navigate = useNavigate(); 

//   const toggleShowOtp = () => setShowOtp(!showOtp);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/auth/login", {
//         email,
//         otp: otp || undefined,
//       });

//       if (res.data?.message === "OTP sent to email") {
//         toast.success("OTP sent to your email");
//         setShowOtpField(true);
//       } else if (res.data?.message === "Login successful") {
//         toast.success("Login successful");
        
//         if (keepLoggedIn) {
//           localStorage.setItem("user", JSON.stringify(res.data));
//         }
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Something went wrong. Try again.");
//     }
//   };

//   const resendOtp = async () => {
//     try {
//       const res = await axios.post("/api/auth/login", { email });
//       if (res.data?.message === "OTP sent to email") {
//         toast.success("OTP resent to your email");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Failed to resend OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen flex rounded-xl border border-gray-300 overflow-hidden max-w-5xl mx-auto">
//       <div className="flex flex-col flex-1 p-8 space-y-6">
//         <div className="flex items-center space-x-2">
//           <AiOutlineLoading3Quarters className="w-6 h-6 text-blue-600" />
//           <span className="font-semibold">HD</span>
//         </div>

//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 text-left">Sign in</h1>
//           <p className="text-gray-500 mt-1 text-left">
//             Please login to continue to your account.
//           </p>
//         </div>

//         <form className="flex flex-col space-y-4 text-left" onSubmit={handleSubmit}>
//           <label className="flex flex-col">
//             <span className="text-sm text-blue-600 font-medium mb-1">Email</span>
//             <input
//               type="email"
//               placeholder="Email"
//               className="border border-blue-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </label>

//           {showOtpField && (
//             <label className="flex flex-col relative">
//               <span className="text-sm text-gray-400 font-medium mb-1">OTP</span>
//               <input
//                 type={showOtp ? "text" : "password"}
//                 placeholder="OTP"
//                 className="border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-2 top-7 text-gray-400 hover:text-gray-600"
//                 onClick={toggleShowOtp}
//                 aria-label="Toggle OTP visibility"
//               >
//                 {showOtp ? (
//                   <AiOutlineEyeInvisible className="h-5 w-5" />
//                 ) : (
//                   <AiOutlineEye className="h-5 w-5" />
//                 )}
//               </button>
//             </label>
//           )}

//           {showOtpField && (
//             <button
//               type="button"
//               onClick={resendOtp}
//               className="text-sm text-blue-600 hover:underline self-start"
//             >
//               Resend OTP
//             </button>
//           )}

//           <label className="flex items-center space-x-2 text-sm">
//             <input
//               type="checkbox"
//               checked={keepLoggedIn}
//               onChange={() => setKeepLoggedIn(!keepLoggedIn)}
//             />
//             <span>Keep me logged in</span>
//           </label>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white rounded-md py-2 mt-2 font-semibold hover:bg-blue-700 transition"
//           >
//             {showOtpField ? "Verify & Sign in" : "Get OTP"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-500">
//           Need an account?{" "}
//           <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
//             Create one
//           </Link>
//         </p>
//       </div>

//       <div className="hidden md:block w-1/2 overflow-hidden rounded-r-lg">
//         <img src={img} alt="Blue Abstract" className="object-cover w-full h-full" />
//       </div>
//     </div>
//   );
// };

// export default SignIn;
import React, { useState } from "react";
import img from "../assets/nature.webp";
import axios from "axios";
import toast from "react-hot-toast";
import {
  AiOutlineLoading3Quarters,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const SignIn = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleShowOtp = () => setShowOtp(!showOtp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        otp: otp || undefined,
      });

      if (res.data?.message === "OTP sent to email") {
        toast.success("OTP sent to your email");
        setShowOtpField(true);
      } else if (res.data?.message === "Login successful") {
        toast.success("Login successful");

        // Update localStorage if user wants to stay logged in
        if (keepLoggedIn) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }

        // Update global App state
        setUser(res.data);

        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!email) return toast.error("Please enter your email first.");
    try {
      const res = await axios.post("/api/auth/login", { email });
      if (res.data?.message === "OTP sent to email") {
        toast.success("OTP resent to your email");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex rounded-xl border border-gray-300 overflow-hidden max-w-5xl mx-auto">
      {/* Left form section */}
      <div className="flex flex-col flex-1 p-8 space-y-6">
       <div className="flex items-center space-x-2 mt-0">
                  <AiOutlineLoading3Quarters className="w-6 h-6 text-blue-600" />
                  <span className="font-semibold">HD</span>
                </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-left">Sign in</h1>
          <p className="text-gray-500 mt-1 text-left">
            Please login to continue to your account.
          </p>
        </div>

        <form className="flex flex-col space-y-4 text-left" onSubmit={handleSubmit}>
          {/* Email */}
          <label className="flex flex-col">
            <span className="text-sm text-blue-600 font-medium mb-1">Email</span>
            <input
              type="email"
              placeholder="Email"
              className="border border-blue-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {/* OTP */}
          {showOtpField && (
            <label className="flex flex-col relative">
              <span className="text-sm text-gray-400 font-medium mb-1">OTP</span>
              <input
                type={showOtp ? "text" : "password"}
                placeholder="OTP"
                className="border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-7 text-gray-400 hover:text-gray-600"
                onClick={toggleShowOtp}
                aria-label="Toggle OTP visibility"
              >
                {showOtp ? (
                  <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                  <AiOutlineEye className="h-5 w-5" />
                )}
              </button>
            </label>
          )}

          {/* Resend OTP */}
          {showOtpField && (
            <button
              type="button"
              onClick={resendOtp}
              className="text-sm text-blue-600 hover:underline self-start"
            >
              Resend OTP
            </button>
          )}

          {/* Keep logged in */}
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
            />
            <span>Keep me logged in</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md py-2 mt-2 font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : showOtpField
              ? "Verify & Sign in"
              : "Get OTP"}
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-500">
          Need an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>

      {/* Right image section */}
      <div className="hidden md:block w-1/2 overflow-hidden rounded-r-lg">
        <img src={img} alt="Nature" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default SignIn;

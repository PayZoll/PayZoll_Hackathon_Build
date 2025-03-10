import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Building2, User } from "lucide-react";
import FormInput from "./FormInput";
import axios from "axios";
import { backendDomain } from "../../constant/domain";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("employee");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
      isEmployeer: userType === "employer",
    };

    console.log('Making request to:', `${backendDomain}/login`);
    const response = await axios.post(`${backendDomain}/login`, loginData);
    if (!response.data.token) {
      alert("Wrong Input");
      return;
    }
    localStorage.setItem("token", response.data.token);

    if (userType === "employee") {
      navigate("/employee/dashboard");
    } else {
      navigate("/employer/dashboard");
    }
  };

  const handleUserTypeChange = (type) => {
    if (type !== userType) {
      setUserType(type);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* User Type Toggle */}
      <div className="flex space-x-4 mb-6">
        {[
          { type: "employee", icon: User, label: "Employee" },
          { type: "employer", icon: Building2, label: "Employer" },
        ].map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            type="button"
            onClick={() => handleUserTypeChange(type)}
            className={`flex-1 py-3 px-4 rounded-xl border ${userType === type
                ? "border-indigo-500 bg-indigo-500/10 text-white"
                : "border-gray-700 text-gray-400 hover:border-indigo-500/50"
              } transition-all flex items-center justify-center space-x-2 group cursor-pointer`}
          >
            <Icon
              className={`w-4 h-4 ${userType === type
                  ? "text-indigo-400"
                  : "text-gray-400 group-hover:text-indigo-400"
                } transition-colors`}
            />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Email Input */}
      <FormInput
        label={userType === "employer" ? "Company Email" : "Email Address"}
        type="email"
        placeholder={
          userType === "employer" ? "Enter company email" : "Enter your email"
        }
        icon={<Mail className="w-5 h-5" />}
        error={errors.email}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
      />

      {/* Password Input */}
      <FormInput
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        icon={<Lock className="w-5 h-5" />}
        error={errors.password}
        endIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        }
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
      />

      {/* Forgot Password Link */}
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl
                 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-200 flex items-center justify-center"
      >
        Login as {userType === "employer" ? "Employer" : "Employee"}
      </button>
    </form>
  );
}

export default LoginForm;

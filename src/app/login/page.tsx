"use client";

import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { username: "", password: "" };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username.trim()) {
      newErrors.username = "Email is required.";
      hasError = true;
    } else if (!emailRegex.test(username)) {
      newErrors.username = "Invalid email format.";
      hasError = true;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.trim()) {
      newErrors.password = "Password is required.";
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
      hasError = true;
    }

    setErrors(newErrors);
    setApiError("");

    if (!hasError) {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Login failed");
        }

        // Handle successful login
        console.log("Login successful:", data);
        // Here you would typically:
        // 1. Store the user data in your state management solution
        // 2. Set any necessary cookies/tokens
        // 3. Redirect to the dashboard or home page
        window.location.href = "/"; // Temporary redirect to home page
      } catch (error) {
        console.error("Login error:", error);
        setApiError(
          error instanceof Error
            ? error.message
            : "An error occurred during login"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-sans px-4">
      <h1 className="text-2xl mb-4 text-center">Login Page</h1>
      <form
        className="bg-white p-6 rounded w-full max-w-md shadow-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username" className="block text-background">
          Email:
        </label>
        <input
          type="email"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          className={`block w-full text-background p-2 border ${
            errors.username ? "border-red-500" : "border-gray-300"
          } rounded mt-1`}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}

        <label htmlFor="password" className="block mt-4 text-background">
          Password:
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className={`block w-full text-background p-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded mt-1`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {apiError && (
          <p className="text-red-500 text-sm mt-4 text-center">{apiError}</p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;

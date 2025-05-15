import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground font-sans">
      <h1 className="text-2xl mb-4">Login Page</h1>
      <form className="bg-white p-4 rounded w-96">
        <label htmlFor="username" className="block text-background">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="block w-full text-background p-2 border border-gray-300 rounded mt-1"
        />
        <label htmlFor="password" className="block mt-2 text-background">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="block w-full text-background p-2 border border-gray-300 rounded mt-1"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

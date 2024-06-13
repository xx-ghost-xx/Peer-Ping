// Importing required modules
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Importing our custom hooks
import useLogIn from "../hooks/useLogin";

// Creating the Login Page
const LogIn = () => {
	// Some states to handle the Form value
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	// A function to handle the submit of Login form
	const { loading, logIn } = useLogIn()
	const handleLogIn = async (e) => {
		e.preventDefault();		// to prevent default refreshing
		try {
			// A hook to perform SignUp operation
			await logIn(userName, password);
		} catch (error) {
			console.log(error.message);
		}
	};
	// JSX to render the page
	return (
		<div className="px-0 py-6 self-center flex flex-col items-center justify-center gap-5 rounded-2xl bg-gray-800 w-80 sm:px-3 sm:mx-auto sm:min-w-96  ">
			<h2 className="font-semibold text-2xl">Login</h2>
			<form onSubmit={handleLogIn} className="w-full m-1 flex flex-col gap-4 items-center justify-center text-sm text-gray-200 sm:p-1 sm:m-3">
				<input 
					type="text" 
					id="username" 
					value={userName} 
					onChange={(e) => setUserName( e.target.value )} 
					placeholder="Username" 
					className="w-5/6 p-2 bg-transparent border-b border-gray-400 outline-none sm:w-3/4" 
				/>
				<input 
					type="password" 
					id="password" 
					value={password} 
					onChange={(e) => setPassword( e.target.value )} 
					placeholder="Password" 
					className="w-5/6 p-2 bg-transparent border-b border-gray-400 outline-none sm:w-3/4" 
				/>
				<button 
					type="submit" 
					disabled={loading} 
					className="btn btn-sm bg-gradient-to-tr from-teal-500 via-green-400 to-teal-800 text-gray-800 sm:btn-wide w-40">
						{!loading ? "LogIn" : (
							<span className="loading loading-spinner"></span>
						)}
				</button>
			</form>
			<div className="flex flex-col items-center text-xs mt-1 sm:flex-row sm:gap-3">
				<span>Don"t have a Account? </span>
				<Link to="/signUp" className="text-cyan-500 underline underline-offset-2" >Create here..</Link>
			</div>
		</div>
	);
};

// Exporting the Login page
export default LogIn;
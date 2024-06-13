// Importing required modules
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Importing our custom hooks
import useSignUp from "../hooks/useSignUp";

// Creating the SignUp page
const SignUp = () => {
	// Some states to handle the Form value
	const [inputs, setInputs] = useState({
		fullName: "",
		userName: "",
		email: "",
		gender: "",
		password: "",
		confirmPassword: "",
	});

	// A function to handle the submit of Signup form
	const { loading, signUp } = useSignUp();		// initializing our custom hook
	const handleSignUp = async (e) => {
		e.preventDefault();		// to prevent default refreshing
		try {
			// A hook to perform SignUp operation
			await signUp(inputs);
		} catch (error) {
			toast.error(error.message);
		}
	};

	// JSX to render the page
	return (
		<div className="px-0 py-6 self-center flex flex-col items-center justify-center gap-5 rounded-2xl bg-gray-800 w-80 sm:px-3 sm:mx-auto sm:min-w-96">
			<h2 className="font-semibold text-2xl">SignUp</h2>
			<form onSubmit={handleSignUp} className="w-full m-1 flex flex-col gap-4 items-center justify-center text-sm text-gray-200 sm:p-1 sm:m-3">
				<input 
					type="text" 
					id="fullname" 
					value={inputs.fullName} 
					onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} 
					placeholder="Fullname" 
					className="w-5/6 p-2 bg-transparent border-b border-gray-400 outline-none sm:w-3/4" />
				<input 
					type="text" 
					id="username" 
					value={inputs.userName} 
					onChange={(e) => setInputs({ ...inputs, userName: e.target.value })} 
					placeholder="Username" 
					className="w-5/6 p-2 bg-transparent border-b border-gray-400 outline-none sm:w-3/4" />
				<input 
					type="email" 
					id="email" 
					value={inputs.email} 
					onChange={(e) => setInputs({ ...inputs, email: e.target.value })} 
					placeholder="Email" 
					className="w-5/6 p-2 bg-transparent border-b border-gray-400 outline-none sm:w-3/4" />
				<select 
					value={inputs.gender} 
					onChange={(e) => setInputs({ ...inputs, gender: e.target.value })} 
					className="select select-ghost select-sm max-w-xs bg-transparent outline-none text-gray-400" >
					<option value="" disabled className="bg-gray-600">Select Gender</option>
					<option value="male" className="bg-gray-600">Male</option>
					<option value="female" className="bg-gray-600">Female</option>
				</select>
				<input 
					type="password" 
					id="password" 
					value={inputs.password} 
					onChange={(e) => setInputs({ ...inputs, password: e.target.value })} 
					placeholder="Password" 
					className="w-5/6 p-2 bg-transparent border-b border-gray-400 outline-none sm:w-3/4" />
				<input 
					type="password" 
					id="cnfmPassword" 
					value={inputs.confirmPassword} 
					onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} 
					placeholder="Confirm Password" 
					className="w-5/6 p-2 bg-transparent border-b border-gray-400 outline-none sm:w-3/4" />
				<button 
					type="submit" 
					disabled={loading} 
					className="btn btn-sm bg-gradient-to-tr from-teal-500 via-green-400 to-teal-800 text-gray-800 sm:btn-wide w-40">
					{!loading ? "SignUp" : (
						<span className="loading loadin-spinner"></span>
					)}
				</button>
			</form>
			<div className="flex flex-col items-center text-xs mt-1 sm:flex-row sm:gap-3">
				<span>Already have an Account? </span>
				<Link to="/logIn" className="text-cyan-500 underline underline-offset-4" >LogIn here..</Link>
			</div>
		</div>
	);
};

// Exporting the SignUp page
export default SignUp;
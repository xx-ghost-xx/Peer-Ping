// Importing required modules
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./contexts/authContext";
import { Toaster } from "react-hot-toast";

// Importing our custom pages
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";


// Creating our React App
function App() {
	const {authUser} = useAuthContext();
	// JSX to render the App
	return (
		<div className="p-6 flex items-start justify-center h-screen overflow-hidden">
			<Routes>
				{/* All routes are inter-dependent ::->:: Only if user is LoggedIn/SingedUp then it will be sent to Home */}
				<Route path="/" element={ authUser ? <Home /> : <Navigate to="/logIn" />} />
				<Route path="/logIn" element={ authUser ? <Navigate to="/" /> : <LogIn/> } />
				<Route path="/signUp" element={ authUser ? <Navigate to="/" /> : <SignUp/> } />
			</Routes>
			<Toaster />
		</div>
	);
}

// Exporting the React App
export default App;

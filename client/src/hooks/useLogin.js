// Importing required modules
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/authContext";

// Creating a hook to perform LogIn operation
const useLogIn = () => {
	// Some states to handle LogIn
	const [ loading, setLoading ] = useState(false);

	// Some context variables to handle LogIn
	const { authUser, setAuthUser } = useAuthContext();

	// a function to handle LogIn
	const logIn = async (userName, password) => {
		// Validating the inputs
		const success = handleInputValidation(userName, password);
		if(!success){
			return;
		}
		// perform LogIn
		setLoading(true);
		try {
			// Send a response to server
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({userName, password})
		   }); 

			// get the response back from server
			const data = await res.json();
			if(data.success === false){
				toast.error(data.message);
				return;
			}
			
			// If LogIn goes successfull then update the localStorage with userData
			localStorage.setItem("authUserInfoPP", JSON.stringify(data));
			// Now update the context with that
			setAuthUser(data);


			if(res.ok){
				toast.success("LogIn successfull.");
			}
		} catch (error) {
			toast.error(error.message);
		} finally{
			setLoading(false);
		}
	};

	// return back some parameters -> loading state & LogIn()
	return { loading, logIn };
};

// Exporting the hook
export default useLogIn;



// A function to handle validations over inputs
const handleInputValidation = (userName,password) => {
	// check for null values
	if(!userName || !password){
		toast.error("All fields are required.");
		return false;
	};

	// If everything goes well then just return true
	return true;
};
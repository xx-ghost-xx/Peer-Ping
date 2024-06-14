// Importing required modules
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/authContext";

// Creating a hook to perform SignUp operation
const useSignUp = () => {
	const navigate = useNavigate();
	// Some states to handle SignUp
	const [ loading, setLoading ] = useState(false);

	// Some context variables to handle signUp
	const { authUser, setAuthUser } = useAuthContext();

	// a function to handle SignUp
	const signUp = async ({fullName, userName, email, gender, password, confirmPassword}) => {
		// Validating the inputs
		const success = handleInputValidation({fullName, userName, email, gender, password, confirmPassword});
		if(!success){
			return;
		}
		// perform signUp
		setLoading(true);
		try {
			// Send a response to server
		   const res = await fetch("/api/auth/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({fullName, userName, email, gender, password, confirmPassword})
		   }); 

			// get the response back from server
			const data = await res.json();
			if(data.success === false){
				toast.error(data.message);
			}
			
			// If SignUp goes successfull then update the localStorage with userData
			localStorage.setItem("authUserInfoPP", JSON.stringify(data));
			// Now update the context with that
			setAuthUser(data);

			if(res.ok){
				toast.success("SignUp successfull.");
			}
		} catch (error) {
			toast.error(error.message);
		} finally{
			setLoading(false);
		}
	};

	// return back some parameters -> loading state & signUp()
	return { loading, signUp };
};

// Exporting the hook
export default useSignUp;



// A function to handle validations over inputs
const handleInputValidation = ({fullName, userName, email, gender, password, confirmPassword}) => {
	// check for null values
	if(!fullName || !userName || !email || !gender || !password || !confirmPassword){
		toast.error("All fields are required.");
		return false;
	};

	// check for both password matches or not
	if(password !== confirmPassword){
		toast.error("Both passwords do not match.");
		return false;
	};

	// check for the length of passwords
	if(password.length < 8){
		toast.error("Password must have atleast 8 characters.");
		return false;
	}

	// If everything goes well then just return true
	return true;
};
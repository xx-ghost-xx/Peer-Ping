// Importing required modules
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../contexts/authContext";


// Creating a hook to perform LogOut operation
const useLogOut = () => {
    // Some states to handle LogOut
    const [ loading, setLoading ] = useState(false);

	// Some context variables to handle LogOut
	const { authUser, setAuthUser } = useAuthContext();

    // a function to handle LogOut
    const logOut = async () => {
        // perform LogOut
        setLoading(true);
        try {
            // Send a response to server
           const res = await fetch("/api/auth/LogOut", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
           }); 

            // get the response back from server
            const data = await res.json();
            if(data.success === false){
                toast.error(data.message);
            }
			
			// If LogOut goes successfull then remove the localStorage data
			localStorage.removeItem("authUserInfoPP");
			// Now update the context with that
			setAuthUser(null);

            if(res.ok){
				toast.success("LogOut successfull.");
            }
        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    };

    // return back some parameters -> loading state & LogOut()
    return { loading, logOut };
};

// Exporting the hook
export default useLogOut;

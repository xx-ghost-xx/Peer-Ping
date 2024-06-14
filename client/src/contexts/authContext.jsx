// Importing required modules
import { createContext, useContext, useState } from "react";

// Creating and Exporting a custom context
export const AuthContext = createContext();

// Creating and Exporting a custom hook for the context
export const useAuthContext = () => {
    return useContext(AuthContext);
}

// Creating and Exporting a custom context provider
export const AuthContextProvider = ({children}) => {
    // Some states to handle Provider operations
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("authUserInfoPP")) || null);
    // Return the provider with some values as a Object
    return <AuthContext.Provider value={{authUser, setAuthUser}} >{children}</AuthContext.Provider>
}
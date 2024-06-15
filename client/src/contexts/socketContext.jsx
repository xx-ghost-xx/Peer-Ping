// Importing required modules
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./authContext";


// Creating and Exporting a custom context
export const SocketContext = createContext();

// Creating and Exporting a custom hook for the context
export const useSocketContext = () => {
    return useContext(SocketContext);
}

// Creating and Exporting a custom context provider
export const SocketContextProvider = ({children}) => {
    // Some states to handle Provider operations
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser){
            const socket = io("http://localhost:8000", {
                query: {
                    userId: authUser.user._id,
                }
            });     // backend server
            setSocket(socket);

            // Get who is online & who is not coming from server
            socket.on("getOnlineUsers", (users)=> {
                setOnlineUsers(users);
            });

            // cleanup func
            return () => {
                socket.close();
            }
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    // Return the provider with some values as a Object
    return <SocketContext.Provider value={{ socket, onlineUsers }} >{children}</SocketContext.Provider>
};
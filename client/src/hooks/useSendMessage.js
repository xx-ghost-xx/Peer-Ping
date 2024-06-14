// Importing required modules
import { useState } from "react";
import toast from "react-hot-toast";
import useChat from "../store/useChat";

// Creating a hook to send the messages
const useSendMessage = () => {
    // Some states to handle sending of message
    const [ loading, setLoading ] = useState(false);
    
    // Getting the global state
    const { messages, setMessages } = useChat();
    const { selectedChat, setSelectedChat } = useChat();

    // a function to handle sending of message 
    const sendMessage = async (message) => {
        // sending a message
        setLoading(true);
        try {
            // Send a response to server
			const res = await fetch(`/api/messages/send/${selectedChat._id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({message})
		   }); 

			// get the response back from server
			const data = await res.json();
			if(data.success === false){
				toast.error(data.message);
				return;
			}

            // Set the messages to global states
            setMessages([...messages, data]);

        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    // Return the states -> loading & sendMessage()
    return {loading, sendMessage};
};

// Exporting the hook
export default useSendMessage;
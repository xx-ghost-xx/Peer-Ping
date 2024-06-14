import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useChat from "../store/useChat";

// Creating a hook to receive the messages
const useReceiveMessage = () => {
    // Some states to handle receiving of message
    const [loading, setLoading] = useState(false);
    
    // Getting the global state
    const { messages, setMessages } = useChat();
    const { selectedChat } = useChat();

    // Effect triggered when chat changes to receive messages immediately
    useEffect(() => {
        // A function to handle receiving of message 
        const receiveMessage = async () => {
            // Check if a chat is selected or not
            if (!selectedChat?._id) return;

            // Receiving a message
            setLoading(true);
            try {
                // Receive a response from server
                const res = await fetch(`/api/messages/receive/${selectedChat._id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                // Get the response back from server
                const data = await res.json();
                if (data.success === false) {
                    toast.error(data.message);
                } else {
                    // Set the messages to global state
                    setMessages(data);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Call the function for execution only if a chat is selected
        receiveMessage();
    }, [selectedChat?._id, setMessages]);

    // Return the states -> loading & messages
    return { loading, messages };
};

// Exporting the hook
export default useReceiveMessage;

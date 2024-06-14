// Importing required modules
import { useEffect, useState } from "react"
import toast from "react-hot-toast";


// Creating a Hook to get all the Chats to show in CHATS component
const useGetChats = () => {
    // Some states to handle the fetching of all Chats
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);

    // Effect to be triggered when something changes
    useEffect(() => {
        // a function to fetch the data
        const getChats = async () => {
            setLoading(true);
            try {
                // Send a response to server
                const res = await fetch("/api/users/getUsersList", {
                    method: "GET"
                });

                // Get a response back from server
                const data = await res.json();

                if(data.success === false){
                    toast.error(data.message);
                }
                // Set the Chats[] to obtained data
                setChats(data);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        // call the function so it gets executed when effect gets triggered
        getChats();
    }, []);

    // Return the states -> loading & chats
    return {loading, chats};
};

// Exporting the hook
export default useGetChats;
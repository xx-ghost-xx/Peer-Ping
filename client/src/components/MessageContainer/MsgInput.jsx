// Importing the required modules
import React, { useState } from "react";

// Importing our custom hooks
import useSendMessage from "../../hooks/useSendMessage";

// Importing the react-icons
import { GrSend } from "react-icons/gr";

// Creating a MsgInput -> Where the message is typed and sent
const MsgInput = () => {
    // Some states to handle the sending of message
    const [ message, setMessage ] = useState("");

    // function to handle the Sending of Message
    const { loading, sendMessage } = useSendMessage();      // initialize the custom hook
    const handleSendMsg = async (e) => {
        e.preventDefault();

        // prevent the user from spamming empty messages
        if (!message)
            return;

        // calling the hook function
        await sendMessage(message);
        // if message sent successfuly then set the message to be empty ""
        setMessage("");
    };

    // JSX to render the component
    return (
        <form onSubmit={handleSendMsg} className="flex items-center justify-center px-1 gap-2 bg-gray-900 bg-opacity-70 border border-gray-600 rounded-md" style={{ height: "8%", width: "100%" }}>
            {/* Msg typing area */}
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type here..." className="flex-1 bg-transparent rounded-md text-sm outline-none h-full p-2" />
            <button type="submit" className="h-8 w-8 shrink-0 flex items-center justify-center text-gray-900 bg-teal-300 outline-none rounded-lg hover:scale-95">
                {loading ? <span className="loading loading-spinner"></span> : (
                    <GrSend />
                )}
            </button>
        </form>
    );
};

// Exporting the component
export default MsgInput;
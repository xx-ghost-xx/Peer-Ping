// Importing required modules
import React from "react";
import { useAuthContext } from "../../contexts/authContext";
import useChat from "../../store/useChat";

// Creating Message -> The actual message that is being sent & received
const Message = ({ message }) => {
    // Check that the message is from us or other user
    const { authUser } = useAuthContext();                          // to check for current user
    const fromMe = message.senderId === authUser.user._id;               // check if msg is sent by me
    const chatClass = fromMe ? "chat-end" : "chat-start";
    const chatColor = fromMe ? "bg-cyan-200" : "bg-pink-100";


    // JSX to render the component
    return (
        <div className={`chat ${chatClass}`}>
            <div className={`chat-bubble min-h-4 py-2 px-3 rounded-xl text-gray-900 ${chatColor} text-sm`}>{message.message}</div>
            <div className="chat-footer opacity-50 text-gray-200 tracking-wide mt-1 font-extralight flex gap-1 items-center" style={{fontSize: "11px"}} >{extractTime(message.createdAt)}</div>
        </div>
    );
};

// Exporting the component
export default Message;



// A function to extract the time out of createdAt field
const extractTime = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return `${day}/${month}/${year} | ${hours}:${minutes}`;
}

// function to pad single-digit no with a leading zero
const padZero = (num) => {
    return num.toString().padStart(2, "0");
}
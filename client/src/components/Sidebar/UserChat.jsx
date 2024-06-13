// Importing required modules
import React from "react";
import useChat from "../../store/useChat";
import { useSocketContext } from "../../contexts/socketContext";

// Creating UserChat -> It represent each user chat with its name & profile
const UserChat = ({ chat }) => {
    // Getting the global states
    const {selectedChat, setSelectedChat} = useChat();

    // Get if the chat is selected for chatting or not
    const isSelected = selectedChat?._id === chat._id;
    
    // Get the users that are online
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(chat._id);

    // JSX to render component
    return <>
        <div 
            className={`flex gap-2 p-1 items-center hover:bg-gray-600 rounded-lg cursor-pointer ${isSelected ? "bg-gray-600" : ""} `}
            onClick={() => setSelectedChat(chat)}
        >
            {/* User Profile Pic */}
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full bg-slate-100">
                    <img src={chat.profilePic} alt="DP" />
                </div>
            </div>
            {/* User name */}
            <div className="flex flex-col flex-1 px-3">
                <p>{chat.fullName}</p>
            </div>
        </div>
        {/* Divider between two chats */}
        <div className="h-1 mb-1 border-b border-gray-700"></div>
    </>
};

// /Exporting the component
export default UserChat;
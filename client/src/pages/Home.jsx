// Importing required modules
import React from "react"
import useChat from "../store/useChat";

// Importing custom components
import UserList from "../components/Sidebar/UserList";
import MessageContainer from "../components/MessageContainer/MsgContainer";
import Navbar from "../components/Navbar";

// Creating the Home Page
const Home = () => {
    // Getting the global states
    const {selectedChat, setSelectedChat} = useChat();
    // JSX to render the page
    return (
        <div className="flex flex-col items-center justify-between w-screen gap-2" style={{ height: `${!selectedChat ? "97.5%" : "85%"}` }}>
            <Navbar />
            <div className="h-full w-full flex items-center justify-between gap-1 bg-slate-800 rounded-2xl p-3">
                <UserList />
                <MessageContainer />
            </div>
        </div>
    );
};

// Exporting the Home page
export default Home;
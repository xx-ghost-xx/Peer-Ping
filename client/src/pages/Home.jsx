// // Importing required modules
// import React from "react"
// import useChat from "../store/useChat";

// // Importing custom components
// import UserList from "../components/Sidebar/UserList";
// import MessageContainer from "../components/MessageContainer/MsgContainer";
// import Navbar from "../components/Navbar";

// // Creating the Home Page
// const Home = () => {
//     // Getting the global states
//     const {selectedChat, setSelectedChat} = useChat();
//     // JSX to render the page
//     return (
//         <div className="flex flex-col items-center justify-between w-screen gap-2" style={{ height: `${!selectedChat ? "97.5%" : "85%"}` }}>
//             <Navbar />
//             <div className="h-full w-full flex items-center justify-between gap-1 bg-slate-800 rounded-2xl p-3">
//                 <UserList />
//                 <MessageContainer />
//             </div>
//         </div>
//     );
// };

// // Exporting the Home page
// export default Home;


// Importing required modules
import React, { useState } from "react";
import useChat from "../store/useChat";

// Importing custom components
import UserList from "../components/Sidebar/UserList";
import MessageContainer from "../components/MessageContainer/MsgContainer";
import Navbar from "../components/Navbar";

// Creating the Home Page
const Home = () => {
    // Getting the global states
    const { selectedChat } = useChat();
    // State to handle drawer open/close
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // JSX to render the page style={{ height: `${!selectedChat ? "97.5%" : "85%"}` }}
    return (
        <div className="flex flex-col items-center justify-center w-screen gap-2 h-full p-2">
            <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)} />
            <div className="h-5/6 w-full p-2 flex items-center justify-center gap-1 bg-slate-800 rounded-2xl relative">
                <div className={`lg:block z-50 ${isDrawerOpen ? 'flex' : 'hidden'} ${isDrawerOpen ? "absolute left-0 top-0 bottom-0 rounded-2xl bg-cyan-950 bg-opacity-40 backdrop-blur-md" : ""} h-full`}>
                    <UserList />
                </div>
                <div className="flex flex-1 h-full w-full">
                    <MessageContainer />
                </div>
            </div>
        </div>
    );
};

// Exporting the Home page
export default Home;

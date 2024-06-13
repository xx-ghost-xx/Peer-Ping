// q// Importing required modules
// import React from "react";

// // Importing cusotm components
// import UserChats from "./UserChats";
// import ChatSearch from "./ChatSearch";

// // Creating UserList -> A sidebar where all users along with searching is displayed
// const UserList = () => {
// 	// JSX to render the component
// 	return (
// 		<div className="flex flex-col items-center justify-center gap-2 h-full w-1/4 p-3 border-gray-600 rounded-xl" style={{ borderWidth: "1px" }}>
// 			<ChatSearch />
// 			<UserChats />
// 		</div>
// 	);
// };

// // Exporting the component
// export default UserList;


// Importing required modules
import React from "react";

// Importing custom components
import UserChats from "./UserChats";
import ChatSearch from "./ChatSearch";

// Creating UserList -> A sidebar where all users along with searching is displayed
const UserList = () => {
    // JSX to render the component
    return (
        <div className="flex flex-col items-center justify-center gap-2 h-full w-full p-3 border-gray-600 rounded-xl" style={{ borderWidth: "1px" }}>
            <ChatSearch />
            <UserChats />
        </div>
    );
};

// Exporting the component
export default UserList;

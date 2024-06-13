// Importing required modules
import React from "react";

// Importing custom componemts
import UserChat from "./UserChat";

// Importing custom hooks
import useGetChats from "../../hooks/useGetChats";

// Creating UserChats -> that shows a list of all Chats/users present for a user
const UserChats = () => {
	// initialize a Hook to get all Chats for ChatList below
	const {loading, chats} = useGetChats();

	// JSX to render the componemt
	return (
		<div className="flex flex-col w-full p-3 overflow-x-hidden overflow-y-auto no-scrollbar" style={{ height: "90%" }}>
			{/* Fetch the Chats from hook */}
			{chats.map((chat) => (
				<UserChat 
					key={chat._id}
					chat={chat}
				/>
			))}

			{loading ? (<span className="loading loading-spinner loading-lg text-teal-300 self-center"></span>) : null}
		</div>
	);
};

// Exporting the componemt
export default UserChats;
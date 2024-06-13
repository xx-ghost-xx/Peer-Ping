// Importing required modules
import React, { useEffect } from "react";
import useChat from "../../store/useChat";
import { useAuthContext } from "../../contexts/authContext";

// Importing custom components
import MsgContainerHeader from "./MsgContainerHeader";
import MsgCanvas from "./MsgCanvas";
import MsgInput from "./MsgInput";

// Creating a MessageContainer -> Window where chatting occurs
const MessageContainer = () => {
	// Getting the global states -> to handle the NoChatSelected() display
    const {selectedChat, setSelectedChat} = useChat();
	const { authUser } = useAuthContext();

	// A cleanup Effect for global state when we logout... 
	// ...so everytime we login, we get a fresh chance to select a chat
	useEffect(() => {
		// cleanup func
		return () => {
			setSelectedChat(null);
		}
	}, []);

	// JSX to render the MessageContainer component
	return (
		<div className="flex flex-col items-center justify-between h-full w-full p-3 border-gray-600 rounded-xl" style={{ borderWidth: "1px" }}>
			{!selectedChat ? <NoChatSelected currentUserName={authUser.user.fullName} /> : (
				// When any chat is selected for messaging
				<>
					<MsgContainerHeader fullName={selectedChat.fullName} profilePic={selectedChat.profilePic} userName={selectedChat.userName} />
					<MsgCanvas />
					<MsgInput />
				</>
			)}
		</div>

	)
}

// Exporting the Message Container
export default MessageContainer;


// The component to show when no chat is selected fro chatting
const NoChatSelected = ({currentUserName}) => {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-medium flex flex-col items-center gap-2">
				<p>Heyy {currentUserName || "User"} !!</p>
				<p>Welcome to Peer Ping...</p>
				<p>Select a Chat to start messaging.</p>
			</div>
		</div>
	);
};
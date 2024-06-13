// Importing required modules
import React, { useEffect, useRef } from "react";

// Importing custom hooks
import useReceiveMessage from "../../hooks/useReceiveMessage";
import useListenMessage from "../../hooks/useListenMessage";

// Importing custom components
import Message from "./Message";
import MessageSkeleton from "../MessageSkeleton";

// Creating the MsgCanvas -> A container where all messages are displayed in a chat
const MsgCanvas = () => {

	// Initialize the custom hook
	const { loading, messages } = useReceiveMessage();
	// Calling the hook for listening the fetching messages in realtime
	useListenMessage();		// triger the effect in this hookF

	// Effect to scroll to bottom of the MsgCanvas
	const lastMsgRef = useRef();
	useEffect(() => {
		setTimeout(() => {
			lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	// JSX to render the component
	return (
		<div id="msgCanvas" className="flex flex-col overflow-y-auto overflow-x-hidden no-scrollbar" style={{ height: "80%", width: "95%" }}>
			{/* Render the messages if they exist */}
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMsgRef}>
						<Message message={message} />
					</div>
				)
				)}
			{/* Show loading if they are being loaded */}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{/* Show alternate chat if no msg exists between users */}
			{!loading && messages.length === 0 && (
				<p className="text-center font-extralight text-gray-400">Send a message to start conversation</p>
			)}

		</div>
	);
};

// Exporting the component
export default MsgCanvas;
// Importing required modules
import { useEffect } from "react";
import { useSocketContext } from "../contexts/socketContext";
import useChat from "../store/useChat";

// Creating the hook
const useListenMessage = () => {
	// Get the sockets
	const {socket} = useSocketContext();
	const {messages, setMessages} = useChat();

	// Effect to listen the messages
	useEffect(() => {
		// When socket is on start listening to messages
		socket?.on("newMessage", (newMessage) => {
			setMessages([...messages, newMessage]);
		});

		// cleanup func
		return () => {
			// when socket is off dont listen to messages
			socket?.off("newMessage");
		}
	}, [socket, setMessages, messages]);
};

// Exporting the hook
export default useListenMessage;

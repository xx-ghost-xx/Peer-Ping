// Importing required modules
import { create } from "zustand";

// Creating global state api
const useChat = create((set) => ({
    selectedChat : null,
    setSelectedChat: (selectedChat) => set({selectedChat}),
    
    messages: [],
    setMessages: (messages) => set({messages}),
}));

// Exporting the global state
export default useChat;
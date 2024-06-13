// Importing required modules
import React, { useState } from 'react';
import toast from 'react-hot-toast';

// Importing react icons
import { HiOutlineSearch } from 'react-icons/hi';
import useChat from '../../store/useChat';
import useGetChats from '../../hooks/useGetChats';

// Creating ChatSearch -> Where the users are searched for chatting
const ChatSearch = () => {
	// States to handle searching of user
	const [search, setSearch] = useState("");
	const { selectedChat, setSelectedChat } = useChat();
	const { chats } = useGetChats();

	// function to handle searching operation
	const handleUserSearch = async (e) => {
		e.preventDefault();
		try {
			// return if no search activity detected
			if(!search){
				return;
			}
			if(search.length < 3){
				toast.error("Search term must have atleast 3 characters.");
				return;
			}

			// finding the conversation
			const searchingChat = chats.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
			if(searchingChat){
				setSelectedChat(searchingChat);
				setSearch("");
			} else {
				toast.error("User not found");
			}
			
		} catch (error) {
			toast.error(error.message);
		}
	}

	// JSX to render the component
	return (
		<div className=' flex items-center justify-center p-2 w-full' style={{ height: "10%" }}>
			<form onSubmit={handleUserSearch} className='w-full flex items-center justify-between gap-3'>
				<input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search here...' className='p-2 rounded-md text-sm flex-1 bg-transparent outline-none border border-gray-600' />
				<button type='submit' className='w-8 h-8 flex items-center justify-center border border-gray-600 rounded-full hover:scale-95'>
					<HiOutlineSearch />
				</button>
			</form>
		</div>
	);
};

// Exporting the component
export default ChatSearch;
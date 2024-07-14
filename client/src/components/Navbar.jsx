// Importing the required modules
import React from "react";
import toast from "react-hot-toast";

// Importing our custom hooks
import useLogout from "../hooks/useLogout";

// Importing React Icons
import { HiOutlineChatAlt2, HiOutlineLogout, HiOutlineCog , HiOutlineMenuAlt2, HiOutlineX } from "react-icons/hi";

// Creating the Navbar component
const Navbar = ({ isDrawerOpen, toggleDrawer }) => {

    // A function to handle the submit of Logout form
    const { loading, logOut } = useLogout();
    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await logOut();
        } catch (error) {
            toast.error(error.message);
        }
    };

    // JSX to render the component
    return (
        <div className="flex items-center justify-between w-full py-3 sm:px-10 px-1 rounded-xl bg-slate-800" style={{ height: "10%" }}>
            <button 
                    className="lg:hidden flex items-center justify-center bg-cyan-700 bg-opacity-30 text-white text-lg p-2 rounded-full hover:scale-95"
                    onClickCapture={toggleDrawer}
                >
                    {isDrawerOpen ? (<HiOutlineX />) : (<HiOutlineMenuAlt2 />)}
                </button>
            <span className="flex items-center sm:gap-3 gap-1 font-semibold sm:text-2xl text-lg tracking-normal">
                <HiOutlineChatAlt2 className="text-3xl text-teal-400"/>
                <p className="flex flex-col sm:flexr-row">Peer Ping</p>
            </span>
            <div className="flex items-center justify-center gap-4 sm:text-2xl text-xl cursor-pointer">
                <HiOutlineCog className="text-pink-200"/>
                {!loading ? (
                    <HiOutlineLogout onClick={handleLogOut} className="text-pink-200"/>
                ) : (
                    <span className="loading loading-spinner"></span>
                )}
            </div>
        </div>
    );
};

// Exporting the Navbar
export default Navbar;

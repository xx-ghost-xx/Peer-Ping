// Importing the required modules
import React from "react";

// Creating MsgContainerHeader -> Where the name of opposite user is shown with whom we are chatting
const MsgContainerHeader = ({fullName, profilePic, userName}) => {
    // JSX to render the component
    return (
    <div className="flex gap-2 p-6 items-center cursor-pointer w-full border-b border-gray-600" style={{height: "8%", width: "95%" }}>
            {/* User Profile Pic */}
            <div className={"avatar"}>
                <div className="w-8 rounded-full bg-slate-100">
                    <img src={profilePic} alt="DP" />
                </div>
            </div>
            {/* User name */}
            <div className="flex flex-col flex-1 px-3">
                <p className="text-base">{fullName}</p>
                <p className="text-xs font-light text-gray-400">@{userName}</p>
            </div>
        </div>
  );
};

// Exporting the component
export default MsgContainerHeader;
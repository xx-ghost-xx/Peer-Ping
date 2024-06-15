// Importing the required modules
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import { SocketContextProvider } from "./contexts/socketContext.jsx";

// /Importing the React App & it"s assets
import App from "./App.jsx"
import "./index.css"

// Creating a ROOT element for a single paged app
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<SocketContextProvider>
					<App />
				</SocketContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
);

// Importing required modules
import mongoose from "mongoose";

// Creating the conversation Schema
const conversationSchema = new mongoose.Schema({
    // An array of participants that contains their IDs
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    // An array of messages that contains its IDs
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        }
    ]
}, { timestamps: true });

// Exporting our model
const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
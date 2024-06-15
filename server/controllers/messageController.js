// Importing Required Modules
import Message from "../models/message.js";
import Conversation from "../models/conversation.js";

// Importing custom socket
import { getReceiverSocketId, io } from "../sockets/socket.js";

// Creating a sendMessage Controller Function
export const sendMessage = async (req, res, next) => {
    try {
        // Grab the message from the payload
        const { message } = req.body;
        // Grab the receiver Id from url
        const receiverId = req.params.id;
        // Grab the verified user(sender) Id from browser
        const senderId = req.user._id;

        // Find the conversation between this two participants
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // If no conversation is there then create one
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        };

        // creating a message for DB
        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        });
        // Push the id of new message created into the Conversations
        if(newMessage)
            conversation.messages.push(newMessage._id);
        
        // Save the conversation & message both in a optimised way,
        //  where they both are saved in parallel to each other at a instant
        await Promise.all([ conversation.save(), newMessage.save() ]);
        
        // Handling the Sockets for realtime messaging
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // io.to(<socket.id>).emit() -> is used to send emits to specific clients/users
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        
        // Send the new message as response
        res.status(201).json(newMessage);

    } catch (error) {
        next(error);
    }
};


// Creating a receiveMessage Controller Function
export const receiveMessage = async (req, res, next) => {
    try {
        // Grab the ID of user with whom we are chatting with from url
        const userToChatId = req.params.id;
        // Grab the verified user(sender) Id from browser
        const senderId = req.user._id;

        // Find the conversation between this two participants 
        // and get the actual message content based on their IDs
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");    // not the reference to each msg but the MSG itself

        // send a empty msg array if no conversation exist
        if(!conversation)
            res.status(200).json([]);

        // Store the obtained messages in a variable
        const obtainedMessages = conversation.messages;

        // send the obtained messages in response
        res.status(200).json(obtainedMessages);

    } catch (error) {
        next(error);
    }
};
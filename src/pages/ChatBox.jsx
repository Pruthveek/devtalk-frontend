import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";

const ChatBox = () => {
  const user = useSelector((store) => store.user);
  const { targetUserId } = useParams();
  console.log(targetUserId);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = user?._id;
  const now = new Date();
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const timeString = now.toLocaleString("en-US", options);

  useEffect(() => {
    if (!userId) return;
    const socket = CreateSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });
    socket.on("messageReceived", ({ firstName, text, image,timeString }) => {
      console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName, text, image,timeString }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = CreateSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      image: user.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
      timeString:timeString,
    });
    setNewMessage("");
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 space-y-4 my-20 sm:mt-20">
        {messages.map((msg, index) => (
          <div className="chat chat-start " key={index}>
            <div className="chat-image avatar shadow-lg shadow-black rounded-full">
              <div className="w-10 rounded-full">
                <img src={msg.image} alt="Obi-Wan" />
              </div>
            </div>
            <div className="chat-header">
              {msg.firstName}
              <time className="text-xs opacity-50 ml-2">{msg.timeString }</time>
            </div>
            {/* Using rounded-full for better text flow, toned down shadow, and added max-width */}
            <div className="chat-bubble max-w-xs sm:max-w-md bg-zinc-300 text-black shadow-2xl shadow-black rounded-full">
              {msg.text}
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>

      {/* Message Input Box Bar */}
      <div className="p-2 border-t mb-0 fixed bottom-12 left-0 w-full">
        <div className="flex items-center gap-2 w-full max-w-7xl mx-auto">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full rounded-full bg-white text-black focus:outline-none "
          />
          <button
            className="btn btn-neutral rounded-full px-4 sm:px-6 flex-shrink-0"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

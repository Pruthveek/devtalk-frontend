import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { CreateSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
const ChatBox = () => {
  const user = useSelector((store) => store.user);
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = user?._id;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isScrolledUpRef = useRef(false);
  const [targetUserPhotoUrl, setTargetUserPhotoUrl] = useState("");

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };
  const isRandomText = (text) => {
    // too short
    if (text.trim().length < 2) return true;

    // contains only symbols or numbers
    if (!/[a-zA-Z]/.test(text)) return true;

    // no vowels (like “xqzplm”)
    if (!/[aeiou]/i.test(text)) return true;

    // repeating same character many times
    if (/(.)\1{3,}/.test(text)) return true;
    return false;
  };
  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!targetUserId) return;

      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
          withCredentials: true,
        });
        setTargetUserPhotoUrl(res.data?.targetUserPhotoUrl);
        const chatMessages = res.data?.chat?.messages.map((msg) => ({
          _id: msg._id, // Using a unique ID for the key is crucial
          firstName: msg?.senderId?.firstName,
          photoUrl: msg?.senderId?.photoUrl,
          messageSenderId: msg?.senderId?._id,
          text: msg?.text,
          timeString: new Date(msg.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        }));
        setMessages(chatMessages || []);
        scrollToBottom("auto"); // Scroll instantly on initial load
      } catch (err) {
        console.error("Failed to fetch chat messages:", err);
        setError("Could not load chat. Please try again later.");
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.messageSenderId === userId) {
      scrollToBottom();
      isScrolledUpRef.current = false;
    } else if (!isScrolledUpRef.current) {
      scrollToBottom();
    }
  }, [messages, userId]);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop > clientHeight + 50) {
        isScrolledUpRef.current = true;
      } else {
        isScrolledUpRef.current = false;
      }
    }
  };

  // --- Socket connection management ---
  useEffect(() => {
    if (!userId) return;

    socket.current = CreateSocketConnection();
    socket.current.emit("joinChat", { userId, targetUserId });

    socket.current.on("messageReceived", (newMessageData) => {
      if (newMessageData.senderId !== userId) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            ...newMessageData,
            _id: newMessageData._id || `socket-${Date.now()}`,
            messageSenderId: newMessageData.senderId,
          },
        ]);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (isRandomText(newMessage)) {
      toast.warning("Please enter a meaningful message!");
      return;
    }
    if (newMessage.trim() === "" || !socket.current) return;

    const timeString = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const messageData = {
      _id: `temp-${Date.now()}`,
      firstName: user.firstName,
      photoUrl: user.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
      timeString: timeString,
    };
    socket.current.emit("sendMessage", messageData);

    setMessages((prevMessages) => [
      ...prevMessages,
      { ...messageData, messageSenderId: userId },
    ]);
    setNewMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          Loading chat...
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex justify-center items-center h-full text-red-500">
          {error}
        </div>
      );
    }
    return messages.map((msg) => (
      <div
        className={`chat ${
          msg.messageSenderId === userId ? "chat-end" : "chat-start"
        }`}
        key={msg._id}
      >
        <div className="chat-image avatar shadow-lg shadow-black rounded-full">
          <div className="w-10 rounded-full">
            <img src={msg.photoUrl} alt="Avatar" />
          </div>
        </div>
        <div className="chat-header">
          {msg.firstName}
          <time className="text-xs opacity-50 ml-2">{msg.timeString}</time>
        </div>
        <div className="chat-bubble max-w-xs sm:max-w-md bg-zinc-300 text-black shadow-2xl shadow-black rounded-full">
          {msg.text}
        </div>
        <div className="chat-footer opacity-50">Delivered</div>
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-screen">
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 space-y-4 my-20 sm:mt-20"
      >
        {renderContent()}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-2 border-t mb-0 fixed bottom-14 left-0 w-full bg-white">
        <div className="flex items-center gap-2 w-full max-w-7xl mx-auto">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full rounded-full bg-white text-black focus:outline-none "
            disabled={loading || !!error}
          />

          <button
            className="btn btn-neutral rounded-full pl-1 pr-4 sm:pl-1 sm:pr-6 flex-shrink-0"
            onClick={sendMessage}
            disabled={loading || !!error}
          >
            <div className={` w-8 overflow-hidden rounded-full bg-amber-300`}>
              <img alt="user profile photo" src={targetUserPhotoUrl} />
            </div>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

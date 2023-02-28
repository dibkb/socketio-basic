import React, { useEffect, useState } from "react";
import Chatbar from "./Chatbar";
import Chatfooter from "./Chatfooter";
import MessageBody from "./MessageBody";
const ChatSection = ({ socket }) => {
  const [userName] = useState(localStorage.getItem("username"));
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      console.log(data);
      setAllMessages([...allMessages, data]);
    });
  }, [socket, allMessages]);
  return (
    <div className="flex h-screen">
      <Chatbar />
      <div className="flex flex-col h-screen w-full">
        <MessageBody messages={allMessages} />
        <Chatfooter />
      </div>
    </div>
  );
};

export default ChatSection;

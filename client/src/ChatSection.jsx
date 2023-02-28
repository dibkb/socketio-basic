import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatbar from "./Chatbar";
import Chatfooter from "./Chatfooter";
import MessageBody from "./MessageBody";
const ChatSection = ({ socket }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (!userName) return navigate("/");
    else {
    }
  }, []);
  const [users, setUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setAllMessages([...allMessages, data]);
    });
  }, [socket, allMessages]);
  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
    console.log("user response");
  }, [socket, users]);
  return (
    <div className="flex h-screen">
      <Chatbar users={users} />
      <div className="flex flex-col h-screen w-full">
        <MessageBody messages={allMessages} />
        <Chatfooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatSection;

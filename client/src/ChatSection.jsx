import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatbar from "./Chatbar";
import Chatfooter from "./Chatfooter";
import MessageBody from "./MessageBody";
// ----------socket-------------
const URL = "http://localhost:8080";
const ChatSection = () => {
  const navigate = useNavigate();
  const [userName] = useState(localStorage.getItem("username"));
  useEffect(() => {
    if (!userName) return navigate("/");
  }, []);
  const socket = io.connect(URL, {
    query: {
      userName,
    },
  });
  const [users, setUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setAllMessages([...allMessages, data]);
    });
  }, [socket, allMessages]);
  useEffect(() => {}, [socket, users]);
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

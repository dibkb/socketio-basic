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
  const socket = io(URL, {
    query: {
      userName,
    },
  });
  const [selectUser, setSelectUser] = useState({
    id: 0,
    userName: "group",
  });
  const [allMessages, setAllMessages] = useState([]);
  const [privateAllMessages, setPrivateAllMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setAllMessages([...allMessages, data]);
    });
  }, [socket, allMessages]);
  useEffect(() => {
    socket.on("private__message__incoming", (data) => {
      setArrivalMessage(data);
    });
  }, [socket]);
  useEffect(() => {
    setPrivateAllMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  console.log(privateAllMessages);
  return (
    <div className="flex h-screen">
      <Chatbar socket={socket} select={selectUser} setSelect={setSelectUser} />
      <div className="flex flex-col h-screen w-full">
        <MessageBody messages={allMessages} selectUser={selectUser} />
        <Chatfooter socket={socket} selectUser={selectUser} />
      </div>
    </div>
  );
};

export default ChatSection;

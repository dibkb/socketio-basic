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
  useEffect(() => {
    console.log(allMessages);
    console.log(privateAllMessages);
    socket.on("messageResponse", (data) => {
      setAllMessages([...allMessages, data]);
      setPrivateAllMessages([...privateAllMessages, data]);
    });
  }, [socket, allMessages]);
  useEffect(() => {
    console.log(allMessages);
    console.log(privateAllMessages);
    socket.on("private__message__incoming", (data) => {
      // setAllMessages([...allMessages, data]);
      setPrivateAllMessages([...privateAllMessages, data]);
    });
  }, [socket, privateAllMessages]);
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

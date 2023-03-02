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
  // const [room] = useState(localStorage.getItem("room"));
  useEffect(() => {
    if (!userName) return navigate("/");
  }, []);
  const socket = io(URL, {
    query: {
      userName,
      // room,
    },
  });
  const [selectUser, setSelectUser] = useState({
    id: 0,
    userName: "general",
  });
  const [selectRoom, setSelectRoom] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [privateAllMessages, setPrivateAllMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [roomMessage, setRoomMessage] = useState([]);
  // =====================join room============================
  useEffect(() => {
    socket.on("room__message__incoming", (data) => {
      // console.log("socket", socket.id);
      // console.log("sender", data.senderId);
      console.log(data.senderId === socket.id);
      if (socket.id === data.senderId) {
      } else {
        setRoomMessage((prev) => [...prev, data]);
      }
    });
  }, [socket]);
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
  return (
    <div className="flex h-screen">
      <Chatbar
        socket={socket}
        select={selectUser}
        setSelect={setSelectUser}
        selectRoom={selectRoom}
        setSelectRoom={setSelectRoom}
      />
      <div className="flex flex-col h-screen w-full">
        <MessageBody
          messages={allMessages}
          roomMessage={roomMessage}
          selectUser={selectUser}
          privateAllMessages={privateAllMessages}
        />
        <Chatfooter socket={socket} selectUser={selectUser} />
      </div>
    </div>
  );
};

export default ChatSection;

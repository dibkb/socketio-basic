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
      room: "happy",
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
  const [arrivalPrivateMessage, setArrivalPrivateMessage] = useState(null);
  const [arrivalRoomMessage, setArrivalRoomMessage] = useState(null);
  const [roomMessage, setRoomMessage] = useState([]);
  // =====================join room============================
  // ---------------------------update room message---------------------
  useEffect(() => {
    socket.on("room__message__incoming", (data) => {
      setArrivalRoomMessage(data);
    });
  }, [socket]);
  useEffect(() => {
    if (arrivalRoomMessage === null) return;
    setRoomMessage((prev) => [...prev, arrivalRoomMessage]);
  }, [arrivalRoomMessage]);
  // ---------------------------update group message---------------------
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setArrivalMessage(data);
    });
  }, [socket]);
  useEffect(() => {
    if (arrivalMessage === null) return;
    setAllMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  // ---------------------------update private message---------------------
  useEffect(() => {
    socket.on("private__message__incoming", (data) => {
      setArrivalPrivateMessage(data);
    });
  }, [socket]);
  useEffect(() => {
    if (arrivalPrivateMessage === null) return;
    setPrivateAllMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalPrivateMessage]);
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

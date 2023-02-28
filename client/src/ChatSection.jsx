import React, { useEffect, useState } from "react";
import MessageBody from "./MessageBody";
const ChatSection = ({ socket }) => {
  const [userName] = useState(localStorage.getItem("username"));
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const submitFormHandler = (e) => {
    e.preventDefault();
    socket.emit("message", {
      text: message,
      sender: userName,
      socketID: socket.id,
    });
    setMessage("");
  };
  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setAllMessages([...allMessages, data]);
    });
  }, [socket, allMessages]);
  return (
    <>
      {userName}
      <MessageBody messages={allMessages} />
      <form action="" onSubmit={submitFormHandler}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default ChatSection;

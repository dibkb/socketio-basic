import React, { useState } from "react";
const ChatSection = ({ socket }) => {
  const [userName] = useState(localStorage.getItem("username"));
  const [message, setMessage] = useState(null);
  const submitFormHandler = (e) => {
    console.log(socket);
    e.preventDefault();
    socket.emit("message", {
      text: message,
      sender: userName,
      socketID: socket.id,
    });
  };
  return (
    <>
      {userName}
      <div></div>
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

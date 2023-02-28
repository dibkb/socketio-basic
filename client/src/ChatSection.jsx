import React, { useState } from "react";
const ChatSection = () => {
  const [userName] = useState(localStorage.getItem("username"));
  const submitFormHandler = (e) => {
    e.preventDefault();
    socket.emit("message", {
      text: "Hello world",
      sender: userName,
      socketID: socket.id,
    });
  };
  return (
    <>
      {userName}
      <div></div>
      <form action="" onSubmit={submitFormHandler}>
        <input type="text" />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default ChatSection;

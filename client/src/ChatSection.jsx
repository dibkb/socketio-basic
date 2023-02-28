import React, { useEffect, useState } from "react";
const ChatSection = ({ socket }) => {
  const [userName] = useState(localStorage.getItem("username"));
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const submitFormHandler = (e) => {
    console.log(socket);
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
      <div>{JSON.stringify(allMessages)}</div>
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

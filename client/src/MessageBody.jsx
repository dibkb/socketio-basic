import React, { useEffect } from "react";
// import "./styles/messgebody.css";
const MessageBody = ({ messages, selectUser }) => {
  const [userName] = React.useState(localStorage.getItem("username"));
  // ------------ group message---------------------
  const content = messages.map((message, index) => {
    if (userName === message.sender) {
      // own message
      return (
        <div
          key={index}
          className="bg-blue-600 text-lg w-fit px-4 py-1 rounded-lg text-white my-1 self-end"
        >
          {message.text}
        </div>
      );
    } else {
      return (
        <div
          key={index}
          className="bg-slate-600 text-lg w-fit px-4 py-1 rounded-lg text-white my-1 self-start flex flex-col"
        >
          <small className="text-slate-400 text-xs font-thin">
            {message.sender}
          </small>
          <span>{message.text}</span>
        </div>
      );
    }
  });
  return (
    <div className="flex-grow flex flex-col p-4">
      <span className="text-xl font-semibold">Welcome {userName}</span>
      {selectUser.userName === "group" ? content : selectUser.userName}
    </div>
  );
};

export default MessageBody;

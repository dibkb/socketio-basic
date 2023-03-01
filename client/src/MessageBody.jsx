import React, { useEffect, useState } from "react";
// import "./styles/messgebody.css";
const MessageBody = ({ messages, selectUser, privateAllMessages }) => {
  const [userName] = React.useState(localStorage.getItem("username"));
  const [showMessage, setShowMessage] = useState([]);
  // useEffect(() => {
  //   console.log(selectUser, "selectUser");
  //   if (privateMessages.sender === selectUser) {
  //     setShowMessage(privateMessages);
  //   }
  // }, [selectUser]);
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
      {selectUser.userName === "group"
        ? content
        : JSON.stringify(privateAllMessages)}
    </div>
  );
};

export default MessageBody;

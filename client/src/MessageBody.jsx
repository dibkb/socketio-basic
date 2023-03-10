import React, { useEffect, useState } from "react";
// import "./styles/messgebody.css";
const MessageBody = ({
  messages,
  selectUser,
  privateAllMessages,
  roomMessage,
}) => {
  const [userName] = React.useState(localStorage.getItem("username"));
  const [showMessage, setShowMessage] = useState([]);
  const [showGroupMessage, setShowGroupMessage] = useState([]);
  useEffect(() => {
    // show message between user and selectYSwer
    setShowMessage(
      privateAllMessages.filter((mess) => {
        if (
          (mess !== null &&
            mess.sender === selectUser.userName &&
            mess.to === userName) ||
          (mess !== null &&
            mess.sender === userName &&
            mess.to === selectUser.userName)
        ) {
          return mess;
        }
      })
    );
  }, [selectUser, privateAllMessages]);
  // ------------ group message---------------------
  useEffect(() => {
    setShowGroupMessage(
      roomMessage.filter((mess) => {
        if (mess.room === selectUser.userName) return mess;
      })
    );
  }, [selectUser, roomMessage]);
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
  const privateMessage = showMessage.map((message, index) => {
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
          <span>{message.text}</span>
        </div>
      );
    }
  });
  const groupMessage = showGroupMessage.map((message, index) => {
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
      {selectUser.userName === "general" && content}
      {selectUser.user && privateMessage}
      {selectUser.room && groupMessage}
    </div>
  );
};

export default MessageBody;

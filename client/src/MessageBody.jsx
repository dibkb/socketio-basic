import React, { useEffect, useState } from "react";
// import "./styles/messgebody.css";
const MessageBody = ({ messages, selectUser, privateAllMessages }) => {
  const [userName] = React.useState(localStorage.getItem("username"));
  const [showMessage, setShowMessage] = useState([]);
  console.log(privateAllMessages);
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
  const privateMessage = showMessage.map((message, index) => {});
  return (
    <div className="flex-grow flex flex-col p-4">
      <span className="text-xl font-semibold">Welcome {userName}</span>
      {selectUser.userName === "group" ? content : []}
    </div>
  );
};

export default MessageBody;

import React from "react";
import "./styles/messgebody.css";
const MessageBody = ({ messages }) => {
  const [userName] = React.useState(localStorage.getItem("username"));
  const content = messages.map((message, index) => {
    return (
      <div
        className={
          userName === message.sender ? "message__block__own" : "message__block"
        }
      >
        {message.text}
      </div>
    );
  });
  return <div className="message__body">{content}</div>;
};

export default MessageBody;

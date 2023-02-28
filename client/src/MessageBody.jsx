import React from "react";

const MessageBody = ({ messages }) => {
  const [userName] = React.useState(localStorage.getItem("username"));
  const content = messages.map((message, index) => {
    return (
      <div
        style={{
          border: "1px solid #303030",
          padding: ".5rem",
        }}
      >
        {message.text}
      </div>
    );
  });
  return (
    <div
      style={{
        // border: "1px solid #747474",
        padding: "1rem",
      }}
    >
      {content}
    </div>
  );
};

export default MessageBody;

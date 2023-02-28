import React from "react";
const Chatfooter = () => {
  const [userName] = React.useState(localStorage.getItem("username"));
  const [message, setMessage] = React.useState("");
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (message !== "") {
      socket.emit("message", {
        text: message,
        sender: userName,
        socketID: socket.id,
      });
      setMessage("");
    }
  };
  return (
    <div className="border flex mb-3 w-100">
      <form action="" onSubmit={submitFormHandler}>
        <input
          className="border border-gray-500 font text-lg font-medium "
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatfooter;

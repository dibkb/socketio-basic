import React from "react";
const Chatfooter = ({ socket, selectUser }) => {
  const [userName] = React.useState(localStorage.getItem("username"));
  const [message, setMessage] = React.useState("");
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (message !== "") {
      if (selectUser.userName === "group")
        socket.emit("message", {
          text: message,
          sender: userName,
          socketID: socket.id,
        });
      else {
        socket.emit("private__message", {
          text: message,
          sender: userName,
          senderId: socket.id,
          to: selectUser,
        });
      }
      setMessage("");
    }
  };
  return (
    <form
      action=""
      onSubmit={submitFormHandler}
      className="w-full flex h-16 gap-3 mb-2"
    >
      <input
        className="border border-gray-500 font text-lg font-medium flex-grow rounded-md"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="w-48 borde bg-slate-700 text-white text-xl rounded-md"
      >
        Send
      </button>
    </form>
  );
};

export default Chatfooter;

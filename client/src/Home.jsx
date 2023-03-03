import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  // if username exists navigate to chat
  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) navigate("/chat");
  }, []);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (username !== "") {
      localStorage.setItem("username", username);
      navigate("/chat");
    } else return;
  };
  const form = (
    <form
      action="submit"
      onSubmit={submitFormHandler}
      className="mx-auto flex flex-col gap-4 h-fit my-auto"
    >
      <input
        type="text"
        placeholder="Enter username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className="font-normal p-2 border border-gray-200 rounded-md"
      />
      <input
        type="text"
        placeholder="Enter username"
        onChange={(e) => setRoom(e.target.value)}
        value={room}
        className="font-normal p-2 border border-gray-200 rounded-md"
      />
      <button
        type="submit"
        className="bg-slate-700 text-white p-3 rounded-md font-medium"
      >
        Enter chat
      </button>
    </form>
  );
  return <div className="flex h-96">{form}</div>;
};

export default Home;

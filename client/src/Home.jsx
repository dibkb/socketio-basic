import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (username !== "") {
      localStorage.setItem("username", username);
      navigate("/chat");
    } else return;
  };
  const form = (
    <form action="submit" onSubmit={submitFormHandler}>
      <input
        type="text"
        placeholder="Enter username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <button type="submit">Enter chat</button>
    </form>
  );
  return <div className="App">{form}</div>;
};

export default Home;

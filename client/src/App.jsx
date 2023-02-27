import { useState } from "react";
import { socket } from "./socket";
import "./App.css";
function App() {
  const [username, setUsername] = useState("");
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (username !== "") {
      socket.auth = { username };
      socket.connect();
      socket.emit("send-message", username);
    } else return;
  };
  return (
    <div className="App">
      <form action="submit" onSubmit={submitFormHandler}>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button type="submit">Enter chat</button>
      </form>
    </div>
  );
}

export default App;

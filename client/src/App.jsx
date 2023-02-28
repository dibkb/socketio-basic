import { io } from "socket.io-client";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ChatSection from "./ChatSection";
// ----------socket-------------
const URL = "http://localhost:8080";
const socket = io.connect(URL);
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatSection socket={socket} />} />
    </Routes>
  );
}

export default App;

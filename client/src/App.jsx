// import { socket } from "./socket";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import ChatSection from "./ChatSection";
// const socket = socketIO.connect("http://localhost:8080");
// adding global username
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatSection />} />
    </Routes>
  );
}

export default App;

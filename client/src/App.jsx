import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ChatSection from "./ChatSection";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatSection />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FlashcardViewer from "./pages/FlashcardViewer.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/s/:subject" element={<FlashcardViewer />} />
    </Routes>
  );
}

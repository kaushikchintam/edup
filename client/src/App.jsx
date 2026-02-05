import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Retrain from "./pages/Retrain";
import GetStarted from "./pages/GetStarted";
import ChangeCareer from "./pages/ChangeCareer";
import CareerPlanning from "./pages/CareerPlanning";
import MyLab from "./pages/MyLab";

function Placeholder({ title }) {
  return (
    <div style={{ padding: 48 }}>
      <h1 style={{ margin: 0, fontSize: 48 }}>{title}</h1>
      <p style={{ opacity: 0.7 }}>Page coming soon.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/retrain" element={<Retrain />} />
        <Route path="/change-career" element={<ChangeCareer />} />
        <Route path="/career-planning" element={<CareerPlanning />} />
        <Route path="/mylab" element={<MyLab />} />
        <Route path="/login" element={<Placeholder title="Log In" />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </BrowserRouter>
  );
}

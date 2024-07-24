import * as React from "react";
import { createRoot } from "react-dom/client";
import Landing from "./screens/Landing";
import Game from "./screens/Game";

import { BrowserRouter , Routes, Route} from "react-router-dom";
export default function App() {
  return (
    <div className="h-screen bg-slate-950">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
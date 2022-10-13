import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./shared/layouts";
import { Landing, Tasks } from "./views/home/pages";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Landing />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

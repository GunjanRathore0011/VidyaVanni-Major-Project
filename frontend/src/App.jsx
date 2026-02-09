import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import MockInterview from "./pages/MockInterview";
import ProjectInsights from "./pages/ProjectInsights";
import Progress from "./pages/Progress";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import StartInterview from "./components/mockComponent/StartInterview";
import SetupMock from "./components/mockComponent/SetupMock";

function App() {
  return (

    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/project-insights" element={<ProjectInsights />} />
          <Route path="/progress" element={<Progress />} />
          <Route
  path="/mock/start-interview/:id"
  element={<StartInterview />}
/>
<Route
  path="/mock/setup"
  element={<SetupMock />}
/>


        </Routes>
      </Router>

    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MockInterview from "./pages/MockInterview";
import ProjectInsights from "./pages/ProjectInsights";
import Progress from "./pages/Progress";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import StartInterview from "./components/mockComponent/StartInterview";
import SetupMock from "./components/mockComponent/SetupMock";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (

    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/learn" element={<Learn />} /> */}
          <Route path="/mock-interview" element={<ProtectedRoute><MockInterview /></ProtectedRoute>} />
          <Route path="/project-insights" element={ <ProtectedRoute><ProjectInsights /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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

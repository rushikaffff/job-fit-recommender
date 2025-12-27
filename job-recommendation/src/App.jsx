// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import UserDashboard from "./pages/User/UserDashboard";
 // import your Login component // import your Login component
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} /> {/* default page */}
          <Route path="/UserDashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import PasswordReset from "./components/PasswordReset";
import PasswordResetConfirm from "./components/PasswordResetConfirm";
import Signup from "./components/Singup";

function App() {
  return (
    <div>
  
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/signup" exact element={<Signup />} />
  			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/password-reset" element={<PasswordReset />} />
			  <Route path="/password-reset/:id/:token" element={<PasswordResetConfirm />} />
              
      </Routes>
      </div>
  );
}

export default App;

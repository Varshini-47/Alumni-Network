import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const userId = new URLSearchParams(location.search).get("userId");

    const handleResetPassword = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/email/reset-password", { userId, newPassword },{withCredentials:true});
            setMessage(response.data);
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setMessage("Error resetting password.");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
            <button onClick={handleResetPassword}>Reset</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;

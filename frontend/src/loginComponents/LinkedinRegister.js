// import React from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function LinkedinRegister() {
// const linkedinLogin = () => {
//   window.location.href = 'http://localhost:8080/oauth2/authorization/linkedin';
// };
  


 
  
//   return (
//     <button
//       onClick={() => linkedinLogin()}
//       className="bg-red-500 text-white p-2 rounded"
//     >
//       Register with LinkedIn
//     </button>
//   );
// }

// export default LinkedinRegister;
import React from "react";
import { LinkedIn } from "react-linkedin-login-oauth2";

const LinkedinRegister = () => {
  const handleSuccess = (response) => {
    console.log("LinkedIn login success:", response);
  };

  const handleFailure = (error) => {
    console.error("LinkedIn login failed:", error);
  };

  return (
    <div>
      <LinkedIn
        clientId="8644q5jbw9lvu0"
        redirectUri="http://localhost:3000/linkedin"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      >
        {({ linkedInLogin }) => (
          <button onClick={linkedInLogin}>Login with LinkedIn</button>
        )}
      </LinkedIn>
    </div>
  );
};

export default LinkedinRegister;

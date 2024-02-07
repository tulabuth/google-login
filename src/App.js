import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useStore } from "./hook/useStore";


function App() {
 const setAuthData = useStore((state) => state.setAuthData);
 return (
   <div className="App">
              <h1>Welcome</h1>
         <GoogleOAuthProvider
           clientId="491905431927-t3kntirc0sgoc51dlcdo1mlsnpe99q3m.apps.googleusercontent.com"
         >
           <GoogleLogin
             useOneTap={true}
             onSuccess={async (credentialResponse) => {
               console.log(credentialResponse);
               const { data } = await axios.post(
                 "http://localhost:3003/member/auth/google-login",{
                  token: credentialResponse.credential,
                 }
                                );
               localStorage.setItem("AuthData", JSON.stringify(data));
               setAuthData(data);
             }}
             onError={() => {
               console.log("Login Failed");
             }}
           />
         </GoogleOAuthProvider>   
      </div>
 );
}

export default App;

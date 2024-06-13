import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { layout } from "../style";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { login } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const LoginToApp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userAuth = await signInWithEmailAndPassword(auth, email, password);

      dispatch(
        login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: userAuth.user.displayName,
          photoUrl: userAuth.user.photoURL,
        })
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    if (!name) {
      return alert("Please enter a full name");
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: profilePic,
      });

      dispatch(
        login({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          displayName: name,
          photoUrl: profilePic,
        })
      );
      console.log("Dispatched login action:", {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName: name,
        photoUrl: profilePic,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-ful h-[80%]">
          <CircularProgress size={45} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="bg-[#cccccc] w-[75%] sm:w-[40%] p-4 rounded-md">
            <h1
              className="header__title flex items-center justify-center mb-6 text-3xl"
              style={layout.textGradient}
            >
              Connectify
            </h1>
            <form className="flex flex-col items-center" onSubmit={LoginToApp}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
                className="mb-2 h-10 border-2 border-orange-400 rounded-md placeholder:p-2 w-full focus:outline-none focus:p-2 px-2"
              />
              <input
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
                type="text"
                placeholder="Profile Pic URL(optional)"
                className="mb-2 h-10 border-2 border-orange-400 rounded-md placeholder:p-2 w-full focus:outline-none focus:p-2 px-2"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="mb-2 h-10 border-2 border-orange-400 rounded-md placeholder:p-2 w-full focus:outline-none focus:p-2 px-2"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="mb-2 h-10 border-2 border-orange-400 rounded-md placeholder:p-2 w-full focus:outline-none focus:p-2 px-2"
              />
              <button
                type="submit"
                className="p-2 rounded-md bg-gradient-to-r from-[#ffe44e] to-[#fa8b0d] w-full flex items-center justify-center"
                disabled={loading}
              >
                Sign In
              </button>
            </form>
          </div>
          <div className="flex mt-2">
            <p>
              Not a member?{" "}
              <span
                className="text-[#fa8b0d] cursor-pointer"
                onClick={register}
              >
                Register Now
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

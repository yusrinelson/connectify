import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/header/Header";
import LeftSide from "./components/left/LeftSide";
import Feed from "./components/main/Feed";
import RightSide from "./components/right/RightSide";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./components/login/Login";
import { useEffect } from "react";
import { auth } from "./components/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // when we logged in and refresh we dont go back to the login page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if(userAuth){
        console.log("User logged in:", user);
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))
      } else{
        console.log("User logged out");
        dispatch(logout())
      }
    })
    return () => unsubscribe()
  },[]);

  return (
    <div className="relative h-screen w-full">
      <Header />
      {!user ? (
        <Login />
      ) : (
        <div className="flex w-full">
          <LeftSide />
          <Feed />
          <RightSide />
        </div>
      )}
    </div>
  );
};

export default App;

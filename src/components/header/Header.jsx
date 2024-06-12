// import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import MenuIcon from "@mui/icons-material/Menu";
import { layout } from "../style";
// import userImage from "../../assets/images/user.svg";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";
import { auth } from "../firebase/firebase";

const Header = () => {
  const [nav, setNav] = useState(false);
  // const user = useSelector(selectUser);
  const links = [
    {
      id: 1,
      link: "settings & privacy",
    },
    {
      id: 2,
      link: "dark/light mode",
    },
    {
      id: 3,
      link: "report a problem",
    },
    {
      id: 4,
      link: "help & support",
    },
  ];

  const dispatch = useDispatch();
  const logOutofApp = () => {
    dispatch(logout());
    auth.signOut();
  };
  return (
    <div className="flex py-5 bg-white border-b items-center justify-start sticky top-0 z-50">
      <div className="basis-1/4">
        <h1
          className="header__title sm:text-2xl ml-3 text-gray-600"
          style={layout.textGradient}
        >
          Connectify
        </h1>
      </div>
      <div className="basis-1/2">
        {/* <div className="flex justify-between items-center mx-4 relative">
          <input
            className="rounded-md bg-transparent p-2 relative text-start w-[100%] focus:outline-none md:w-[60%] border-gray-400 border-2"
            type="text"
            placeholder="Search"
          />
          <img src={userImage} alt="" className="w-10 rounded-full ml-4" />
        </div> */}
      </div>
      <div className="basis-1/4 flex items-center justify-around px-4 text-[#f28c18] ">
        <NotificationsIcon className="cursor-pointer" />
        <div className="hidden md:block cursor-pointer">
          <ChatIcon className="cursor-pointer" />
        </div>
        {nav ? (
          <CloseIcon
            className="cursor-pointer ml-2"
            onClick={() => setNav(false)}
          />
        ) : (
          <MenuIcon
            className="cursor-pointer ml-2"
            onClick={() => setNav(true)}
          />
        )}
      </div>

      {nav && (
        <ul className="flex flex-col absolute top-[50px] right-[5px] md:right-[30px] w-[50%] md:w-[20%] h-fit bg-slate-300 rounded-md">
          {links.map(({ id, link }) => (
            <li key={id} className="m-2 p-2 text-sm md:text-md hover:bg-slate-400 rounded-md cursor-pointer">
              {link}
            </li>
          ))}
          <li className="m-2 p-2 text-sm md:text-md cursor-pointer hover:bg-slate-200 rounded-md" onClick={logOutofApp}>logout</li>
        </ul>
      )}
    </div>
  );
};

export default Header;

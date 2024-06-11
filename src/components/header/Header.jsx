// import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import MenuIcon from "@mui/icons-material/Menu";
// import userImage from "../../assets/images/user.svg";

const Header = () => {
  return (
    <div className="flex py-5 bg-white border-b items-center justify-start sticky top-0 z-50">
      <div className="basis-1/4">
        <h1 className="header__title sm:text-2xl ml-3 text-gray-600" >
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
          <ChatIcon className="cursor-pointer"/>
        </div>
        <MenuIcon className="cursor-pointer ml-2" />
      </div>
    </div>
  );
};

export default Header;

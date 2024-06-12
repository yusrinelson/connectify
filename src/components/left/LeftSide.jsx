import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InputOptions from "./InputOptions";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ChatIcon from "@mui/icons-material/Chat";
import AvatarSignOut from "../main/AvatarSignOut";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const LeftSide = () => {
  const user = useSelector(selectUser);

  return (
    <div className="relative z-40 md:basis-1/4">
      {/* This div is for small devices */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t  p-2 flex flex-row items-center justify-around">
        <InputOptions title="Home" color="#f28c18" Icon={HomeIcon} />
        <InputOptions title="Reels" color="#f28c18" Icon={ChatIcon} />
        {/* <Avatar src={userImage} sx={{ width: 45, height: 45 }} className="mr-2 cursor-pointer" /> */}
        <AvatarSignOut avatar={true} />
        <InputOptions title="Friends" color="#f28c18" Icon={PeopleAltIcon} />
        <InputOptions title="Reels" color="#f28c18" Icon={OndemandVideoIcon} />
      </div>

      {/* This div is for medium and larger devices */}
      <div className="hidden md:flex md:flex-col p-4 sticky top-20">
        <div className="flex items-center mb-4 ">
          <AvatarSignOut avatar={true}/>
          <h2 className="text-xl">
            {user.displayName}
          </h2>
        </div>
        <InputOptions title="Home" color="#f28c18" Icon={HomeIcon} />
        <InputOptions title="Friends" color="#f28c18" Icon={PeopleAltIcon} />
        <InputOptions title="Reels" color="#f28c18" Icon={OndemandVideoIcon} />
      </div>
    </div>
  );
};

export default LeftSide;

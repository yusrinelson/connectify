import userImage from "../../assets/images/user.svg";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InputOptions from "./InputOptions";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { Avatar } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const LeftSide = () => {
  return (
    <div className="relative z-40 md:basis-1/4">
      {/* This div is for small devices */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t  p-4 flex flex-row items-center justify-around">
        <InputOptions title="Home" color="#f28c18" Icon={HomeIcon} />
        <InputOptions title="Reels" color="#f28c18" Icon={ChatIcon} />
        <Avatar src={userImage} sx={{ width: 45, height: 45 }} className="mr-2 cursor-pointer" />
        <InputOptions title="Friends" color="#f28c18" Icon={PeopleAltIcon} />
        <InputOptions title="Reels" color="#f28c18" Icon={OndemandVideoIcon} />
      </div>

      {/* This div is for medium and larger devices */}
      <div className="hidden md:flex md:flex-col  p-4 sticky top-20">
        <div className="flex items-center mb-4 ">
          <Avatar src={userImage} sx={{ width: 45, height: 45 }} className="mr-2 cursor-pointer" />
          <h2 className="text-xl">Yusri Nelson</h2>
        </div>
        <InputOptions title="Home" color="#f28c18" Icon={HomeIcon} />
        <InputOptions title="Friends" color="#f28c18" Icon={PeopleAltIcon} />
        <InputOptions title="Reels" color="#f28c18" Icon={OndemandVideoIcon} />
      </div>
    </div>
  );
};

export default LeftSide;

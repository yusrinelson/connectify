import { Avatar } from "@mui/material";
import userImage from "../../assets/images/user.svg";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SellIcon from "@mui/icons-material/Sell";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import screenshotImage from "../../assets/images/screenshot.png"

const Feed = () => {
  const [selectedStory, setSelectedStory] = useState(Array(10).fill(false));

  const handleStoryClick = (index) => {
    const updatedSelectedStory = [...selectedStory];
    updatedSelectedStory[index] = !updatedSelectedStory[index];
    setSelectedStory(updatedSelectedStory);
  };
  // style={{ "-ms-overflow-style": "none", "scrollbar-width": "none" }}

  return (
    <div className="md:basis-1/2 basis-full border-r-0 md:border-r border-l   border-gray-300 md:max-w-[55%] max-w-full mb-20 ">
      <div className="flex flex-row items-center justify-start py-4 px-5 overflow-x-auto mb-10">
        {[...Array(10)].map((_, index) => (
          <Avatar
            key={index}
            sx={{
              width: "85px",
              height: "85px",
              "@media (max-width: 540px)": {
                width: "70px",
                height: "70px",
              },
              "@media (max-width: 440px)": {
                width: "65px",
                height: "65px",
              },
            }}
            className={`mr-3 cursor-pointer border-2 ${
              selectedStory[index] ? "border-black" : "border-[#f28c18]"
            }`}
            onClick={() => handleStoryClick(index)}
          />
        ))}
      </div>
      <div className="flex items-center">
        <Avatar src={userImage} className="ml-4" />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="border-2 rounded-md p-2 mx-4 w-full focus:outline-none"
        />
      </div>
      <div className="flex justify-between items-center px-4 lg:px-20 py-4">
        <div>
          <AddPhotoAlternateIcon
            sx={{
              width: "40px",
              height: "40px",
              "@media (max-width: 540px)": {
                width: "30px",
                height: "30px",
              },
            }}
            className="text-blue-400"
          />
          <span className="text-gray-500 ml-2 hidden sm:inline ">
            Photo/Video
          </span>
        </div>
        <div>
          <SellIcon
            sx={{
              width: "40px",
              height: "40px",
              "@media (max-width: 540px)": {
                width: "30px",
                height: "30px",
              },
            }}
            className="text-green-400"
          />
          <span className="text-gray-500 ml-2 hidden sm:inline">
            Tag Friends
          </span>
        </div>
        <div>
          <VideoCameraFrontIcon
            sx={{
              width: "40px",
              height: "40px",
              "@media (max-width: 540px)": {
                width: "30px",
                height: "30px",
              },
            }}
            className="text-red-500"
          />
          <span className="text-gray-500 ml-2 hidden sm:inline">Live</span>
        </div>
      </div>
      <div className="bg-gray-100 mx-6 p-4 rounded-md mb-4">
        <div className="flex">
          <Avatar
            src={userImage}
            sx={{ width: 45, height: 45 }}
            className="mr-2 cursor-pointer"
          />
          <div className="mb-7">
            <h2 className="text-sm font-bold">Yusri Nelson</h2>
            <h4 className="text-xs font-semibold">yusrinelson@gmail.com</h4>
          </div>
        </div>
        <img
          src={screenshotImage}
          alt=""
          className="w-full object-contain h-fit rounded-md"
        />
        <ul className="flex gap-5 mt-4 text-gray-600">
          <li><FavoriteBorderIcon/></li>
          <li><ChatBubbleOutlineIcon/></li>
          <li><ReplyIcon className="scale-x-[-1]"/></li>
        </ul>
      </div>
    </div>
  );
};

export default Feed;

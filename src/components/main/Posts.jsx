import { Avatar, CircularProgress } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
// import screenshotImage from "../../assets/images/screenshot.png";
import PropTypes from "prop-types";
import { useState } from "react";

const Posts = ({ name, description, message, photoUrl, imageUrl }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <div className="bg-gray-100 mx-6 p-4 rounded-md mb-4">
        <div className="flex">
          <Avatar
            src={photoUrl}
            sx={{ width: 45, height: 45 }}
            className="mr-2 cursor-pointer ounded-full h-12 w-12 border "
          />
          <div className="mb-7">
            <h2 className="text-sm font-bold">{name}</h2>
            <h4 className="text-xs font-semibold">{description}</h4>
          </div>
        </div>
        <div>
          <p className="mb-6 ml-3">{message}</p>
          {imageUrl && (
            <div className="flex justify-center items-center w-full h-full">
              {loading && (
                <div className="flex justify-center items-center w-full h-full">
                  <CircularProgress />
                </div>
              )}
              <img
                src={imageUrl}
                alt=""
                className={`w-full object-contain h-fit rounded-md ${
                  loading ? "hidden" : ""
                }`}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
              />
            </div>
          )}
        </div>
        <ul className="flex gap-5 mt-4 text-gray-600">
          <li>
            <FavoriteBorderIcon />
          </li>
          <li>
            <ChatBubbleOutlineIcon />
          </li>
          <li>
            <ReplyIcon className="scale-x-[-1]" />
          </li>
        </ul>
      </div>
    </div>
  );
};
Posts.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  message: PropTypes.string,
  photoUrl: PropTypes.string,
  imageUrl: PropTypes.string,
};
export default Posts;
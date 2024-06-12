import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";

const AvatarSignOut = ({ avatar, onClick }) => {
  const user = useSelector(selectUser);

  return (
    <div onClick={onClick}>
      {avatar && user && (
        <Profile
          src={user.photoUrl}
          alt={user.email}
          sx={{ width: 50, height: 50 }}
        >
          {user.email[0]}
        </Profile>
      )}
    </div>
  );
};

const Profile = ({ src, alt, sx }) => {
  return (
    <div className="mr-2 cursor-pointer ">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`rounded-full border border-gray-300 object-cover`}
          style={sx}
        />
      ) : (
        <div
        >
          <Avatar/>
        </div>
      )}
    </div>
  );
};

AvatarSignOut.propTypes = {
  avatar: PropTypes.bool,
  onClick: PropTypes.func,
};

Profile.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default AvatarSignOut;

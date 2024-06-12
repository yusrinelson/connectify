import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SellIcon from "@mui/icons-material/Sell";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import Posts from "./Posts";
import {
  collection,
  serverTimestamp,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "../../index.css";

const Feed = () => {
  const [selectedStory, setSelectedStory] = useState(Array(10).fill(false));
  const [input, setInput] = useState("");
  const user = useSelector(selectUser);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log("Fetched posts:", postsData);
      setPosts(postsData);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleStoryClick = (index) => {
    const updatedSelectedStory = [...selectedStory];
    updatedSelectedStory[index] = !updatedSelectedStory[index];
    setSelectedStory(updatedSelectedStory);
  };

  const sendPost = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    try {
      await addDoc(collection(db, "posts"), {
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || "",
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="md:basis-1/2 basis-full border-r-0 md:border-r border-l   border-gray-300 md:max-w-[55%] max-w-full">
      <div className="flex flex-row items-center justify-start py-4 sm:mx-5 overflow-x-auto no-scrollbar mb-10 border-b">
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
      <div className="flex items-center w-[95%]">
        <Avatar src={user.photoUrl} className="mx-4" />
        <form className="w-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="What's on your mind?"
            className="border-2 rounded-md p-2 w-full focus:outline-none"
          />
          <button className="hidden" onClick={sendPost} type="submit">
            send
          </button>
        </form>
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
      {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
        <Posts
          key={id}
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}
    </div>
  );
};

export default Feed;

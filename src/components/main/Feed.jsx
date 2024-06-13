import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import Posts from "./Posts";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "../../index.css";
import Modal from "./Modal";

const Feed = () => {
  //stories state
  const [selectedStory, setSelectedStory] = useState(Array(10).fill(false));
  const user = useSelector(selectUser);
  //posting states
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

  /**makes sure only one story is selected */
  const handleStoryClick = (index) => {
    const updatedSelectedStory = [...selectedStory];
    updatedSelectedStory[index] = !updatedSelectedStory[index];
    setSelectedStory(updatedSelectedStory);
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
      <div className="flex items-center justify-center w-[95%] mb-10">
        <Avatar src={user.photoUrl} className="mx-4" />

          <Modal/>

      </div>
      {posts.map(({ id, data: { name, description, message, photoUrl, imageUrl } }) => (
        <Posts
          key={id}
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
          imageUrl={imageUrl}
        />
      ))}
    </div>
  );
};

export default Feed
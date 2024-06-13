import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { style } from "../style";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
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
import { getStorage, getDownloadURL, uploadBytes, ref } from "firebase/storage";
const Modal = () => {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log("Fetched posts:", postsData);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleCustomFileButtonClick = (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
  };

  const sendPost = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    let imageUrl = "";
    if (image) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }
    try {
      await addDoc(collection(db, "posts"), {
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || "",
        imageUrl: imageUrl,
        timestamp: serverTimestamp(),
      });
      setInput("");
      setImage(null);
      setImagePreview(null); // Clear image preview
      toggleModal(); //close modal after posting
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form className="w-full">
      <div className="flex items-center justify-center">
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
        <div className="flex items-center">
          <AddPhotoAlternateIcon
            sx={{
              width: "40px",
              height: "40px",
              "@media (max-width: 540px)": {
                width: "30px",
                height: "30px",
              },
            }}
            className="text-blue-400 cursor-pointer"
            onClick={toggleModal}
          />
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] bg-black bg-opacity-60">
          <div className="w-[80%] md:w-[40%] h-fit md:h-[70%] bg-slate-200 pb-20 relative rounded-md">
            <div className="mb-[50px]">
              <CloseIcon
                className="absolute top-2 right-2 "
                fontSize="large"
                onClick={toggleModal}
              />
            </div>
            <h1 className="absolute top-2 left-4 cursor-pointer font-semibold">
              Create A Post
            </h1>
            <div>
              <div className="w-full flex items-center justify-center flex-col h-full">
                <textarea
                  placeholder="Post something to your feed!"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  name="text"
                  cols={50}
                  className="placeholder:px-2 rounded-md focus:p-2 p-2 focus:outline-none resize-none w-[90%] h-[75%] bg-transparent"
                ></textarea>

                {imagePreview && (
                  <div className="w-11/12 my-2">
                    <img
                      src={imagePreview}
                      alt="Selected"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                )}

                <div className="flex items-center absolute bottom-0 w-full">
                  <div className=" w-[30%] flex">
                    <AddPhotoAlternateIcon
                      className="cursor-pointer rounded-t-none rounded-bl-none text-blue-500"
                      type="button"
                      onClick={handleCustomFileButtonClick}
                      sx={{ width: 40, height: 40 }}
                    />
                  </div>
                  <div className="w-full"></div>
                  <button
                    className={`${style.buttonGradient} mb-[4px] mr-[4px] w-[30%] text-sm font-semibold`}
                    type="submit"
                    onClick={sendPost}
                  >
                    POST
                  </button>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default Modal;

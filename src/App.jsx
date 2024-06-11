import "./App.css";
import Header from "./components/header/Header";
import LeftSide from "./components/left/LeftSide";
import Feed from "./components/main/Feed";
import RightSide from "./components/right/RightSide";

const App = () => {
  return (
    <div className="relative h-screen">
      <Header />
      <div className="flex">
        <LeftSide/>
        <Feed />
        <RightSide />
      </div>
    </div>
  );
};

export default App;

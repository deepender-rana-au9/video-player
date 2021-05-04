import logo from "./logo.svg";
import "./App.css";
import VideoPlayer from "./Components/VideoPlayer";
import PlayList from "./Components/PlayList";
import { BrowserRouter, Route } from "react-router-dom";
import Video from "./Components/Video";

function App() {
  return (
    <div className="App">
      <div className="main">
        <VideoPlayer />
        <BrowserRouter>
          <PlayList />
          <Route exact path="/playlist/:id" component={Video} />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

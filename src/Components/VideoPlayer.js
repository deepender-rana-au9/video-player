import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer() {
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=uncay27JjOA");
  const [newUrl, setNewUrl] = useState("");

  const clickHandler = () => {
    fetch("http://localhost:2000/addurl", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <ReactPlayer url={url} />
      <input
        type="text"
        placeholder="add url here"
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <button onClick={() => clickHandler()}>Add to playlist</button>
    </div>
  );
}

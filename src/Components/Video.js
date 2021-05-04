import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

export default function Video() {
  const { id } = useParams();
  const [url, setUrl] = useState("");
  useEffect(() => {
    fetch(`http://localhost:2000/playlist/${id}`)
      .then((res) => res.json())
      .then((url) => setUrl(url));
  }, [id]);

  return (
    <div>
      <ReactPlayer url={url.length > 0 && url[0].url} />
    </div>
  );
}

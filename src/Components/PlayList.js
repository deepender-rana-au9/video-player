import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

export default function PlayList() {
  const [url, setUrl] = useState("");
  useEffect(() => {
    fetch("http://localhost:2000/allurls")
      .then((res) => res.json())
      .then((urls) => setUrl(urls));
  }, []);

  const editHandler = (id) => {
    console.log(id);
    const newUrl = prompt("Enter a new valid url");
    console.log(newUrl);
    url.filter((u) => {
      if (u._id === id._id) {
        return (u.url = newUrl);
      }
    });
    window.location.reload();
    fetch("http://localhost:2000/edit", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id._id,
        url: id.url,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  const deleteHandler = (id) => {
    fetch("http://localhost:2000/delete", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id._id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        window.location.reload();
      });
  };

  return (
    <div>
      <ul>
        {url &&
          url.map((u) => {
            return (
              <>
                <Link to={`/playlist/${u._id}`} key={u._id}>
                  <li key={u._id}>{u.url}</li>
                </Link>
                <button
                  onClick={() => {
                    editHandler(u);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteHandler(u);
                  }}
                >
                  Delete
                </button>
              </>
            );
          })}

        {/* <li>URL 1</li>
        <li>URL 2</li>
        <li>URL 3 </li> */}
      </ul>
    </div>
  );
}

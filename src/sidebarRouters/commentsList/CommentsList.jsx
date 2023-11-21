import React, { useEffect, useRef, useState } from "react";
import Commint from "../../components/comments/Comment";
import prev from "../../imgs/prev.svg";
import sent from "../../imgs/sent.svg";

const cursId = window.location.pathname.split("/").at(-1);
import "./style.css";
import axios from "axios";
import defaultimg from "../../imgs/user-1.png";

function findCursById(cursList, cursId) {
  for (let i = 0; i < cursList?.length; i++) {
    if (cursList[i]?.cursId === cursId) {
      return true;
    }
  }
  return false;
}
function deleteplatforma(url) {
  try {
    if (url?.includes("platforma")) {
      url = url.split("/");
      let res = "";
      for (let i = 2; i < url.length; i++) {
        res += "/" + url[i];
      }
      return res;
    } else {
      return url;
    }
  } catch (error) {
    console.log(error);
  }
}

function CommentsList({ modalDarslar, changeModalDars, commints  }) {
  
  const izohref = useRef();
  const [Comments, setComments] = useState([]);
  useEffect(() => {
    setComments(commints);
  }, [commints?.length]);
  const handleClick = () => {
    changeModalDars(false);
  };
  function sendIzoh(e) {
    e.preventDefault();
    console.log();
    if (izohref.current.value.trim() !== "") {
      axios
        .post(
          "https://api.ilmlar.com/courses/commint",
          {
            cursId: cursId,
            text: izohref.current.value.trim(),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.Comments) {
            setComments(res.data.Comments);
            console.log("Comments", Comments);
          }
          else{
            alert("bu kursni sotib olmagansiz")
          }
        })
        .catch((error) => {
          console.log("Xatolik yuz berdi: ", error);
        })
        .finally(() => {
          izohref.current.value = "";
        });
    } else {
      izohref.current.value = "";
    }
  }

  async function userphoto(id) {
    await axios.get(`https://api.ilmlar.com/users/${id}`).then((res) => {
      console.log(res.data.path);
      return res.data.path;
    });
  }
  const [profile, setProfil] = useState({})
  useEffect(() => {
    axios.get("https://api.ilmlar.com/usersme", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((res) => {
      setProfil(res?.data)
    })
  }, [])

  return (
    <div className="Nav commit">
      <div
        className={modalDarslar ? "mobile__header" : "d-none "}
        onClick={handleClick}
      >
        <div className="circle">
          <img src={prev} alt="prev" />
        </div>
        <h3>Darslar</h3>
      </div>
      <h2>Izohlar</h2>
      <div className="commints">

        {Comments?.map((commint, index) => {
          if (commint.username && commint.text && commint?.text != "")
            return (
              <div className="d-block">
                <div className="comment_wrap">
                  {commint.userPath ? (
                    <img
                      width={"35px"}
                      src={
                        "https://api.ilmlar.com" +
                        deleteplatforma(commint.userPath)
                      }
                      alt=""
                    />
                  ) : (
                    <img src={defaultimg} alt="" />
                  )}
                  <div className="comment_wrap_into">
                    <p>{commint.text}</p>
                    <p className="commint-username">{commint.username}</p>
                  </div>
                </div>
              </div>
            );
        })}
      </div>
      {(findCursById(profile?.mycurs,cursId))?
      <div className="writing_comment">
        <form
          action=""
          onSubmit={(e) => {
            sendIzoh(e);
          }}
        >
          <input ref={izohref} type="text" placeholder="Izoh yozing..." />
          <button type="submit">
            <img src={sent} alt="" />
          </button>
        </form>
      </div>
     :"" }
    </div>
      
  );
}

export default CommentsList;

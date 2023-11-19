import React, { useEffect, useRef, useState } from "react";
import Commint from "../../components/comments/Comment";
import prev from "../../imgs/prev.svg";
import sent from "../../imgs/sent.svg";
const cursId = (window.location.pathname.split('/').at(-1))
import "./style.css";
import axios from "axios";
import defaultimg from "../../imgs/user-1.png"
function deleteplatforma(url) {
  try {
    if (url?.includes("platforma")) {
      url = url.split("/")
      let res = ""
      for (let i = 2; i < url.length; i++) {
        res += "/" + url[i]
      }
      return (res)
    }
    else { return url }

  } catch (error) {
    console.log(error)
  }
}

function CommentsList({ modalDarslar, changeModalDars, commints }) {
  console.log(commints);
  const [Comments,setcomments]=useState(commints)
  const handleClick = () => {
    changeModalDars(false);
  };
  function sendIzoh(e) {
    e.preventDefault()
    console.log()
    axios
      .post('https://api.ilmlar.com/courses/commint', {
        cursId: cursId,
        text: izohref.current.value
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setcomments(res.data.Comments)
        console.log(res.data.Comments);
      })
      .catch((error) => {
        console.log('Xatolik yuz berdi: ', error);
      });
  }
  const izohref = useRef();
  async function userphoto(id) {
    await axios.get(`https://api.ilmlar.com/users/${id}`).then((res) => {
      console.log(res.data.path);
      return res.data.path
    })
  }
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
        if(commint.username && commint.text)
        return <div className="d-block">
          <div className="d-flex">
            <p className="commint-username">{commint.username}</p>
            <p>{commint.text}</p>
            {
            commint.userPath ? <img
            width={"35px"}
            src={"https://api.ilmlar.com" + deleteplatforma(commint.userPath)}
            alt=""
          /> : <img
          src={defaultimg}
          alt=""
        />
            
          }
          </div>

        </div>
      })}
      </div>
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
    </div>
  );
}

export default CommentsList;

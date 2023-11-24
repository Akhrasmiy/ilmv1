import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import user from "../../../imgs/edit_user.png";
import camera from "../../../imgs/camera.png";
import axios from "axios";

const StudentProfileEdit = () => {
  const [profil, setProfil] = useState()
  useEffect(() => {
    axios
      .get("https://api.ilmlar.com/usersme", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setProfil(res.data);
      });
  }, []);
  const usernameref = useRef()
  const firstnameref = useRef()
  const lastnameref = useRef()
  
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/student/profile/subs");
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    console.log({
      username: usernameref.current.value,
      fullname: firstnameref.current.value + " " + lastnameref.current.value
    });
    axios.put("https://api.ilmlar.com/users/", {
      username: usernameref.current.value,
      fullname: firstnameref.current.value + " " + lastnameref.current.value
    }, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((res) => {

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate(-1);
      }
    })

  };
  const handlechange = () => {
    usernameref.current.value=usernameref.current.value.toLowerCase().trim()
  }
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    setImage(imageUrl);
  };

  return (
    <div className="app-content">
      <div className={style.edit_profile}>
        <button onClick={onBack} className={style.back}>
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <div className={style.imgs_div}>
          <img src={user} className={style.imgs_div_img} alt="" />
          <div className={style.select_camera_wrap}>
            <img src={camera} alt="camera img" />
            <input
              type="file"
              className={style.img_file_input}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <form onSubmit={(e) => onHandleSubmit(e)} className={style.form}>
          <input ref={firstnameref} defaultValue={profil?.fullname?.split(" ")[0] || ""} min={1} type="text" placeholder="ism" />
          <input ref={lastnameref} defaultValue={profil?.fullname?.split(" ")[1] || ""} type="text" placeholder="familiya" />
          <input ref={usernameref} defaultValue={profil?.username || ""} onChange={handlechange} type="text" placeholder="username" />
          <button>Saqlash</button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfileEdit;

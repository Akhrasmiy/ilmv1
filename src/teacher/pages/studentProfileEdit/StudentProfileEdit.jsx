import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import user from "../../../imgs/user-1.png";
import camera from "../../../imgs/camera.png";
import axios from "axios";
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
  const usernameRef = useRef()
  const firstnameref = useRef()
  const lastnameref = useRef()
  const userimgRef = useRef()

  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const onBack = () => {
    navigate("/student/profile/subs");
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", `${firstnameref.current.value} ${lastnameref.current.value}`);
    formData.append("username", usernameRef.current.value);
    formData.append("file", userimgRef.current.files[0]);
    console.log(formData);
    axios
      .put("https://api.ilmlar.com/users/", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/student/profile");
      })
      .catch((error) => console.log(error));
  };
  const handlechange = () => {
    usernameRef.current.value = usernameRef.current.value.toLowerCase().trim()
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
          {
            profil?.path ? <img className={style.imgs_div_img} src={"https://api.ilmlar.com" + deleteplatforma(profil?.path)} alt="" /> : <img className={style.imgs_div_img} src={camera} alt="camera img" />
          }
          <div className={style.select_camera_wrap}>

            <img src={camera} alt="camera img" />
            <input
              type="file"
              className={style.img_file_input}
              onChange={handleImageChange}
              ref={userimgRef}
            />
          </div>
        </div>
        <form onSubmit={(e) => onHandleSubmit(e)} className={style.form}>
          <input ref={firstnameref} defaultValue={profil?.fullname?.split(" ")[0] || ""} min={1} type="text" placeholder="ism" />
          <input ref={lastnameref} defaultValue={profil?.fullname?.split(" ")[1] || ""} type="text" placeholder="familiya" />
          <input ref={usernameRef} defaultValue={profil?.username || ""} onChange={handlechange} type="text" placeholder="username" />
          <button>Saqlash</button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfileEdit;

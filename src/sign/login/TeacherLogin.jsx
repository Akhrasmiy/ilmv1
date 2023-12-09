import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "../style.css";
const TeacherLogin = () => {
  const passwordRef = useRef();
  const usernameRef = useRef();
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  const handlechange= () =>{
    usernameRef.current.value=usernameRef.current.value.toLowerCase().trim()
  }
  const onHandler = (e) => {
    e.preventDefault();
    const obj = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    axios
      .post("https://api.ilmlar.com/teacher/login", obj)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/teacher/darslar");
        }
      })
      .catch((err) => {
        toast.error('Username yoki parol xato', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(err);
      });
  };
  return (
    <div className="app-content">
      <ToastContainer />
      <div className="sign_wrap">
      <button onClick={onBack} className="back">
        <ion-icon name="chevron-back-outline"></ion-icon>
      </button>
        <form className="sign_form" onSubmit={(e) => onHandler(e)}>
          <input ref={usernameRef} required onChange={handlechange} type="text" placeholder="username" />
          <input ref={passwordRef} required type="password" placeholder="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default TeacherLogin;

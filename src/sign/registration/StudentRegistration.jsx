import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import { ToastContainer, toast } from 'react-toastify';


const StudentRegistration = () => {
  const [verifycode, setverifycode] = useState(false);
  const [email, setemail] = useState("");
  const nameRef = useRef();
  const emailcodeRef = useRef();
  const surnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRepeatRef = useRef();
  const fileRef = useRef();
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };
  const handlechange = () => {
    usernameRef.current.value = usernameRef.current.value.toLowerCase().trim();
  };
  const onHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", usernameRef.current.value);
    formData.append("password", passwordRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append(
      "fullname",
      `${nameRef.current.value} ${surnameRef.current.value}`
    );
    setemail(emailRef.current.value);
    console.log(formData);
    axios
      .post("https://api.ilmlar.com/users/register/", formData)
      .then((response) => {
        console.log(response.data);
        toast.info(`${emailRef.current.value}ga kod yuborildi. Tasdiqlash kodni kiriting`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setverifycode(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onverify = (e) => {
    e.preventDefault();
    console.log({
      email: email,
      code: emailcodeRef.current.value,
    });
    axios.post("https://api.ilmlar.com/users/register/verify", {
      email: email,
      code: emailcodeRef.current.value,
    });
  };

  return (
    <div className="app-content">
      <div className="sign_wrap">
      <ToastContainer />
        <h3 className="registr_title">O'quvchi sifatida ro'yxatdan o'tish</h3>
        <button onClick={onBack} className="back">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <form className="registr_form" onSubmit={(e) => onHandler(e)}>
          <input ref={nameRef} type="text" placeholder="ism" required />
          <input ref={surnameRef} type="text" placeholder="familiya" required />
          <input
            ref={usernameRef}
            onChange={handlechange}
            type="text"
            placeholder="username"
            required
          />
          <input ref={emailRef} type="email" placeholder="email" required />
          <input
            ref={passwordRef}
            type="password"
            placeholder="parol"
            required
          />
          <input
            ref={passwordRepeatRef}
            type="password"
            placeholder="parolni qayta yozing"
            required
          />
          <div className="register-mobile__forBtn">
            <button 
          className={`${verifycode ? "d-none" : ""} verify_form`} type="submit">Davom etish</button>
          </div>
        </form>
        <form
          action=""
          className={`${verifycode ? "activecode" : "noactivecode"} verify_form`}
          onSubmit={(e) => onverify(e)}
        >
          <input ref={emailcodeRef} maxLength={6} type="number" placeholder="Kodni kiriting" required />
          <button type="submit">Ro'yxatdan o'tish</button>
        </form>
        <Link className="alright_note" to={"/login"}>
          alright, do you have an account?
        </Link>
      </div>
    </div>
  );
};

export default StudentRegistration;

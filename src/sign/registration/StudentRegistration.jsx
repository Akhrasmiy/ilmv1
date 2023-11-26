import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

const StudentRegistration = () => {
  const [verifycode, setverifycode] = useState(false)
  const [email, setemail] = useState("")
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
    usernameRef.current.value = usernameRef.current.value.toLowerCase().trim()
  }
  const onHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", usernameRef.current.value);
    formData.append("password", passwordRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("fullname", `${nameRef.current.value} ${surnameRef.current.value}`);
    setemail(emailRef.current.value)
    console.log(formData);
    axios
      .post("https://api.ilmlar.com/users/register/", formData)
      .then((response) => {
        console.log(response.data);
        setverifycode(true)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onverify = (e) => {
    e.preventDefault();
    console.log({
      email: email,
      code: emailcodeRef.current.value
    })
    axios.post("https://api.ilmlar.com/users/register/verify", {
      email: email,
      code: emailcodeRef.current.value
    })
  }

  return (
    <div className="app-content">
      <div className="sign_wrap">
        <h3 className="registr_title">O'quvchi sifatida ro'yxatdan o'tish</h3>
        <button onClick={onBack} className="back">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <form className="registr_form" onSubmit={(e) => onHandler(e)}>
          <input ref={nameRef} type="text" placeholder="ism" required />
          <input ref={surnameRef} type="text" placeholder="familiya" required />
          <input ref={usernameRef} onChange={handlechange} type="text" placeholder="username" required />
          <input ref={emailRef} type="email" placeholder="email" required />
          <input ref={passwordRef} type="password" placeholder="parol" required />
          <input ref={passwordRepeatRef} type="password" placeholder="parolni qayta yozing" required />
          <div className="register-mobile__forBtn">
            <button type="submit">Ro'yxatdan o'tish</button>
          </div>

        </form>
        <form action=""  className={`${verifycode?"activecode":"noactivecode"}`} onSubmit={(e) => onverify(e)}>

          <input ref={emailcodeRef} type="number" placeholder="code" required />
          <button type="submit">ruyhatdan otish</button>
        </form>
        <Link className="alright_note" to={"/login"}>alright, do you have an account?</Link>
      </div>
    </div>
  );
};

export default StudentRegistration;
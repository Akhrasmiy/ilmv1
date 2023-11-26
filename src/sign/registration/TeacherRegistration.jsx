import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

const TeacherRegistration = () => {

  const [verifycode, setverifycode] = useState(false)
  const [email, setemail] = useState("")
  const emailcodeRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRepeatRef = useRef();
  const fileRef = useRef();
  const navigate = useNavigate();
  const handlechange = () => {
    usernameRef.current.value = usernameRef.current.value.toLowerCase().trim()
  }
  const onBack = () => {
    navigate(-1);
  };

  const onHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", fileRef.current.files[0]);
    formData.append("username", usernameRef.current.value);
    formData.append("password", passwordRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append(
      "fullname",
      `${nameRef.current.value} ${surnameRef.current.value}`
    );
    setemail(emailRef.current.value)

    axios
      .post("https://api.ilmlar.com/teacher/register/", formData)
      .then((response) => {
        // Handle successful registration
        console.log(response.data);
        setverifycode(response.data.email)
      })
      .catch((error) => {
        // Handle registration error
        console.error(error);
      });
  };
  const onverify = (e) => {
    e.preventDefault();
    console.log({
      email: email,
      code: emailcodeRef.current.value
    })
    axios.post("https://api.ilmlar.com/teacher/register/verify", {
      email: email,
      code: emailcodeRef.current.value
    })
  }
  return (
    <div className="app-content">
      <div className="sign_wrap">
        <h3 className="registr_title">O'qituvchi sifatida ro'yxatdan o'tish</h3>
        <button onClick={onBack} className="back">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <form className="registr_form" onSubmit={(e) => onHandler(e)}>
          <input ref={nameRef} type="text" placeholder="ism" required />
          <input ref={surnameRef} type="text" placeholder="familiya" required />
          <input
            ref={usernameRef}
            type="text"
            placeholder="username"
            required
            onChange={handlechange}
          />
          <input ref={emailRef} type="email" placeholder="email" required />
          {/* <div className="input_registr_file"> */}
          <input
            ref={fileRef}
            className="input_registr_file"
            type="file"
            placeholder="profilephoto"
            required
          />
          {/* <p>rasm tanlang</p> */}
          {/* <ion-icon name="camera-outline"></ion-icon> */}
          {/* </div> */}

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
          <button type="submit">Ro'yxatdan o'tish</button>
        </form>
        <form action="" className={`${verifycode ? "activecode" : "noactivecode"}`} onSubmit={(e) => onverify(e)}>

          <input ref={emailcodeRef} type="number" placeholder="code" required />
          <button type="submit">ruyhatdan otish</button>
        </form>
        
      </div>
    </div>
  );
};

export default TeacherRegistration

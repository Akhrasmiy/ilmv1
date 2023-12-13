import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";

const TeacherRegistration = () => {
  const [verifycode, setverifycode] = useState(false);
  const [email, setemail] = useState("");
  const emailcodeRef = useRef();
  const nameRef = useRef();
  const surnameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRepeatRef = useRef();
  const fileRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const handlechange = () => {
    usernameRef.current.value = usernameRef.current.value.toLowerCase().trim();
  };
  const onBack = () => {
    navigate(-1);
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

    axios
      .post("https://api.ilmlar.com/teacher/register/", formData)
      .then((response) => {
        // Handle successful registration
        toast.info(
          `${emailRef.current.value} ga kod yuborildi. Tasdiqlash kodni kiriting`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setverifycode(response.data.email);
      })
      .catch((error) => {
        // Handle registration error
        console.error(error);
      });
  };
  const onverify = (e) => {
    e.preventDefault();
    axios
      .post("https://api.ilmlar.com/teacher/register/verify", {
        email: email,
        code: emailcodeRef.current.value,
      })
      .then((res) => {
        if (res.data._id) {
          navigate("/teacherlogin");
        }
      });
  };
  function showFunc(e) {
    e.target.classList.toggle("bi-eye");
    setShowPassword((prev) => !prev);
  }
  function showFuncRepeat(e) {
    e.target.classList.toggle("bi-eye");
    setShowPasswordRepeat((prev) => !prev);
  }
  return (
    <div className="app-content">
      <div className="sign_wrap">
        <ToastContainer />

        <button onClick={onBack} className="back">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <div className="registration_wrapper">
          <form className="registr_form" onSubmit={(e) => onHandler(e)}>
            <h3 className="registr_title">
              O'qituvchi sifatida ro'yxatdan o'tish
            </h3>
            <input ref={nameRef} type="text" placeholder="Ism" required />
            <input
              ref={surnameRef}
              type="text"
              placeholder="Familiya"
              required
            />
            <input
              ref={usernameRef}
              type="text"
              placeholder="Foydalanuvchi nomi"
              required
              onChange={handlechange}
            />
            <input ref={emailRef} type="email" placeholder="Email" required />

            <div className="show_password_registr">
              <input
                ref={passwordRef}
                required
                type={showPassword ? "text" : "password"}
                placeholder="Parol"
              />
              <i
                onClick={(e) => showFunc(e)}
                className="bi bi-eye-slash closeIcon"
              ></i>
            </div>
            <div className="show_password_registr">
              <input
                ref={passwordRepeatRef}
                required
                type={showPasswordRepeat ? "text" : "password"}
                placeholder="Parolingizni yana kiriting"
              />
              <i
                onClick={(e) => showFuncRepeat(e)}
                className="bi bi-eye-slash closeIcon"
              ></i>
            </div>
            <button
              type="submit"
              className={`${verifycode ? "d-none" : ""} verify_form`}
            >
              Davom etish
            </button>
          </form>
          <form
            action=""
            className={`${
              verifycode ? "activecode" : "noactivecode"
            } verify_form`}
            onSubmit={(e) => onverify(e)}
          >
            <input
              ref={emailcodeRef}
              type="number"
              placeholder="Emailga yuborilgan kodni kiriting"
              required
            />
            <button type="submit">Ro'yxatdan o'tish</button>
          </form>
        </div>
        <Link className="alright_note" to={"/teacherlogin"}>
          Akkauntingiz bormi?
        </Link>
      </div>
    </div>
  );
};

export default TeacherRegistration;

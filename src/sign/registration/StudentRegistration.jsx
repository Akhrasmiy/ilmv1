import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

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
        setverifycode(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onverify = (e) => {
    e.preventDefault();
    ({
      email: email,
      code: emailcodeRef.current.value,
    });
    axios
      .post("https://api.ilmlar.com/users/register/verify", {
        email: email,
        code: emailcodeRef.current.value,
      })
      .then((res) => {
        if (res.data._id) {
          navigate("/login");
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
              O'quvchi sifatida ro'yxatdan o'tish
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
              onChange={handlechange}
              type="text"
              placeholder="Foydalanuvchi nomi"
              required
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
              className={`${verifycode ? "d-none" : ""} verify_form`}
              type="submit"
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
              maxLength={6}
              type="number"
              placeholder="Emailga yuborilgan kodni kiriting"
              required
            />
            <button type="submit">Ro'yxatdan o'tish</button>
          </form>
        </div>
        <Link className="alright_note" to={"/login"}>
          Akkauntingiz bormi?
        </Link>
      </div>
    </div>
  );
};

export default StudentRegistration;

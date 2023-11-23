import React, { memo, useEffect, useState } from "react";
import CommentsList from "../sidebarRouters/commentsList/CommentsList";
import { useNavigate, useParams } from "react-router-dom";
import coin from "../imgs/coin.png";
import "./index.css";
import MobileHeader from "../components/mobileHeader/mobileHeader";
import StudentNavbar from "../navbar/student/StudentNavbar";
import axios from "axios";
import urlJoin from "url-join";
import {Progress,Space} from 'antd'
function findCursById(cursList, cursId) {
  for (let i = 0; i < cursList?.length; i++) {
    if (cursList[i]?.cursId === cursId) {
      console.log(true);
      return true;
    }
  }
  console.log(false);
  return false;
}
function AboutCourseInfo() {
  const [heart, setHeart] = useState(false);
  const [kurs, setKurs] = useState({});
  const [price, setPrice] = useState(false);
  const [teacher, setTeacher] = useState({});
  const { kursId } = useParams();
  const [savedCourse, setSavedCourse] = useState([]);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfil] = useState({});
  function savekurs(id) {
    axios
      .post(
        "https://api.ilmlar.com/users/savecurs",
        {
          cursId: id,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get("https://api.ilmlar.com/usersme", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSavedCourse(res?.data?.savecurss);
      });
  }, []);
  useEffect(() => {
    for (let i = 0; i < savedCourse.length; i++) {
      if (savedCourse[i] == kursId) {
        setSaved(true);
      }
    }
  }, [savedCourse]);
  let [modal, setModal] = useState(false);
  let [modalDarslar, setModalDarslar] = useState(false);
  const changeModal = (value) => {
    setModal(value);
  };

  const changeModalDars = (value) => {
    setModalDarslar(value);
  };

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
  useEffect(() => {
    axios
      .get("https://api.ilmlar.com/courses/" + kursId, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setKurs(res.data);
        axios
          .get(
            res.data.teacher_Id
              ? "https://api.ilmlar.com/teacherinfo/" + res.data.teacher_Id
              : "https://api.ilmlar.com/teacherinfo/" + res.data.teacherId
          )
          .then((res) => {
            setTeacher(res.data);
          });
      });
  }, []);
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
  function onBack() {
    navigate(-1);
  }
  async function salom(){
    const muddati=await findCursById(profile.mycurs,kursId).muddati
    console.log(muddati/(kurs.muddati*30*24*3600*1000));
  }
  salom()

  return (
    <div className="main__course-buy">

      <div className="about-head">
        <div style={{ display: "flex" }}>
          <button onClick={onBack} className="back-1">
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <div style={{ width: "85%" }}>
            <MobileHeader
              changeModalDars={changeModalDars}
              changeModal={changeModal}
              modal={modal}
              modalDarslar={modalDarslar}
              type={"Kurs haqida"}
              wherey="teach"
            />
          </div>
        </div>
      </div>
      <div className="every__cource-info sidebar-main-wrap w100">
        <div className={modal ? "def modal-navbar" : "def yoq"}>
          <StudentNavbar changeModal={changeModal} modal={modal} />
        </div>
        <div
          className={
            modal || modalDarslar
              ? "blur sidebar-main-wrap mobile_none"
              : "sidebar-main-wrap mobile_none"
          }
        >
          <div
            className="every__cource-bigImg"
            style={{
              backgroundImage: `url(${urlJoin(
                "https://api.ilmlar.com/",
                `${kurs?.obloshka}`
              )})`,
            }}
          ></div>

          <div className="every__cource-desc">
            <div className="every__cource-header">
              <div
                className="every__cource-title"
                onClick={() => {
                  navigate(
                    "/student/teacherinfo/" + deleteplatforma(teacher?._id)
                  );
                }}
              >
                <img
                  src={urlJoin(
                    "https://api.ilmlar.com/",
                    `${deleteplatforma(teacher?.path)}`
                  )}
                  alt=""
                />
                <h3>{teacher?.fullname}</h3>
              </div>
              <div className="every__cource-nav">
                {saved ? (
                  <ion-icon
                    onClick={() => {
                      savekurs(kursId);
                      setSaved(false);
                    }}
                    name="bookmark"
                  ></ion-icon>
                ) : (
                  <ion-icon
                    onClick={() => {
                      savekurs(kursId);
                      setSaved(true);
                    }}
                    name="bookmark-outline"
                  ></ion-icon>
                )}
                {kurs?.narxi == 0 ? (
                  <span className="free_mark">Free</span>
                ) : (
                  <img src={coin} alt="" />
                )}
              </div>
            </div>
            


            {(findCursById(profile?.mycurs, kursId)) ?
              <div>
              <div className="every__cource-name">
                <p>Kurs nomi: {kurs?.Kursname}</p>
              </div>
              <div>
                <Progress  percent={67} size={[,20]} trailColor="rgba(0,0,0,0.3)" status="active"  strokeColor={'#00E03F'} ></Progress>
              </div>
              <div className="every__course-buttons">
                <button
                  onClick={() => {
                    const isCursIdExists = profile?.mycurs?.some(
                      (curs) => curs?.cursId === kursId
                    );
                    navigate("/student/kurs/olinganlar/" + kursId);
                  }}
                >
                  davom etish
                </button>
              </div>
            </div>
              : <div>
              <div className="every__cource-name">
                <p>Kurs nomi: {kurs?.Kursname}</p>
              </div>
              <div className="every__cource-num">
                <p className="every__cource-para">
                  Kurs narxi: {kurs?.narxi} so'm
                </p>
                <p className="every__cource-para">
                  Olingan: {kurs?.subs?.length || kurs?.subs}
                </p>
                <p className="every__cource-para">
                  Davomiyligi: {kurs?.muddati}oy
                </p>
              </div>
              <div className="every__cource-about">
                <p>Kurs haqida: {kurs?.Kursdesc}</p>
              </div>
              <div className="every__course-buttons">
                <button
                  onClick={() => {
                    const isCursIdExists = profile?.mycurs?.some(
                      (curs) => curs?.cursId === kursId
                    );
                    navigate("/student/kurs/olinganlar/" + kursId);
                  }}
                >
                  Video darslar
                </button>

                <button
                  onClick={() => navigate("/student/notboughtcouse/" + kursId)}
                >
                  Kursni olish
                </button>
              </div>
            </div>
              
              
            }


          </div>
        </div>
      </div>
      <div className="mobileForedit">
        <CommentsList commints={kurs?.Comments} />
      </div>
      <div className={modalDarslar ? "defDars modalDarslar aa" : "defDars yoq"}>
        <CommentsList
          modalDarslar={modalDarslar}
          changeModalDars={changeModalDars}
          commints={kurs?.Comments}
        />
      </div>
    </div>
  );
}

export default memo(AboutCourseInfo);

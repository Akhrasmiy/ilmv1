import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./courseInfo.css";
import VideosNavbar from "../components/videosTeacherNavbar/VideosNavbar";
import or3 from "../imgs/or3.svg";

import styles from "./courseInfo.module.css";
import axios from "axios";
import MobileHeader from "../components/mobileHeader/mobileHeader";
import ReactPlayer from "react-player";
import Loader from "../loader/Loader";

function deleteplatforma(url) {
  try {
    if (url.includes("platforma")) {
      const parts = url.split("/");
      const s = parts.slice(2).join("/");
      return s; // Remove the first 3 segments of the URL
    }
    return url;
  } catch (error) {
    console.log(error);
    return url;
  }
}

function Baykurs() {
  const { kursId } = useParams();
  const courseId = kursId;
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState([]);
  const [courseIndex, setCourseIndex] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState({});

  let [modal, setModal] = useState(false);
  let [modalDarslar, setModalDarslar] = useState(false);
  function clickModal() {
    setModal(!modal);
  }
  const changeModal = (value) => {
    setModal(value);
  };
  function clickDarslarModal() {
    setModalDarslar(!modalDarslar);
  }
  const changeModalDars = (value) => {
    setModalDarslar(value);
  };

  useEffect(() => {
    axios
      .get("https://api.ilmlar.com/courses/" + kursId, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourseData(res.data.vedios);
        setSelectedVideo(res.data.vedios[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId]);
  const next = () => {
    if (courseData.length > courseIndex) {
      setCourseIndex(courseIndex + 1);
      setSelectedVideo(courseData[courseIndex]);
    }
  };
  const handleVideoSelection = (video) => {
    setSelectedVideo(video);
  };
  const handleCourseIndex = (index) => {
    setCourseIndex(index);
  };
  const onBack = () => {
    navigate(-1);
  };
  return (
    <div className="app-content">
      <div className="course_info">
        <button onClick={() => onBack()} className="lesson_btn_wrap">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <div className={modal ? "def2 modal-navbar" : "def2 yoq"}>
          <VideosNavbar
            courseData={courseData}
            handleVideoSelection={handleVideoSelection}
            handleCourseIndex={handleCourseIndex}
            changeModal={changeModal}
            courseIndex={courseIndex}
            modal={modal}
          />
        </div>
        <div
          className={
            modal || modalDarslar ? "blur main_lesson mobile" : " main_lesson"
          }
        >
          <div style={{ display: "flex" }}>
            <button onClick={onBack} className={styles.back}>
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>
            <div style={{ width: "85%" }}>
              <MobileHeader
                changeModalDars={changeModal}
                changeModal={changeModalDars}
                modal={modal}
                modalDarslar={modalDarslar}
                type={"Video dars"}
                wherey="teach"
              />
            </div>
          </div>
          <div className="video_information video_information_scroll">
            <ReactPlayer
              playing={true}
              url={`https://api.ilmlar.com/${deleteplatforma(
                selectedVideo.orni
              )}`}
              onEnded={() => {
                next();
              }}
              alt="Video"
              width="100%"
              muted={true}
              controls
              fallback={<img src={or3} alt="" />}
              config={{
                file: {
                  attributes: { controlsList: 'nodownload' },
                },
              }}
              onContextMenu={(e) => e.preventDefault()}
              // config={{ 
              //   file: { 
              //     attributes: {
              //       onContextMenu: e => e.preventDefault(),
              //       controlsList: "nodownload"
              //     } 
              //   } 
              // }}
              // config={{ file: { attributes: { controlsList: "nodownload" } } }}
            />
            <div className="video_information_content">
              <h3>
                {courseIndex} - dars. {selectedVideo.nomi}
              </h3>
              <p>{selectedVideo.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Baykurs;

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./courseInfo.css";
import VideosNavbar from "../components/videosTeacherNavbar/VideosNavbar";

import styles from "./courseInfo.module.css";
import axios from "axios";
import MobileHeader from "../components/mobileHeader/mobileHeader";

function deleteplatforma(url) {
  try {
    if (url.includes("platforma")) {
      const parts = url.split("/");
      const s = parts.slice(2).join("/");
      // console.log(s);
      return s; // Remove the first 3 segments of the URL
    }
    console.log(url);
    return url;
  } catch (error) {
    console.log(error);
    return url;
  }
}

function Baykurs() {
  const { kursId } = useParams();
  const courseId=kursId
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
    console.log("darslarModal", modalDarslar);
    setModalDarslar(!modalDarslar);
    console.log("darslarModal", modalDarslar);
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
        <div><button onClick={onBack} className="back">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button></div>
        
        {/* <div className="videos_navbar video_information_scroll">
          <ul className="videos_navbar">
            {courseData.map((course, index) => (
              <li
                key={index}
                onClick={() => {
                  setSelectedVideo(course);
                  setCourseIndex(index + 1);
                }}
              >
                {index + 1}-dars. {course.nomi}
              </li>
            ))}
          </ul>
        </div> */}
        <div className={modal ? "def2 modal-navbar" : "def2 yoq"}>
          <VideosNavbar
            courseData={courseData}
            handleVideoSelection={handleVideoSelection}
            handleCourseIndex={handleCourseIndex}
            changeModal={changeModal}
            modal={modal}
          />
        </div>
        <div
          className={
            modal || modalDarslar ? "blur main_lesson mobile" : " main_lesson"
          }
        >
          <div style={{display:"flex"}}>
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
            <div className="img_div">
              <video
                src={`https://api.ilmlar.com/${deleteplatforma(
                  selectedVideo.orni
                )}`}
                alt=""
                disablePictureInPicture
                playbackRate={3}
                controls
                controlsList="nodownload"
              />
            </div>
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

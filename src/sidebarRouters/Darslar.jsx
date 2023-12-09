import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Darslar = () => {
  const navigate = useNavigate();

  const [profile, setProfil] = useState({});
  const [teacherData, setTeacherData] = useState([]);
  console.log("teacherdata", teacherData);
  function deleteplatforma(url) {
    try {
      if (url.includes("platforma")) {
        url = url.split("/");
        let res = "";
        for (let i = 2; i < url.length; i++) {
          res += "/" + url[i];
        }
        return res;
      }
      return "/" + url;
    } catch (error) {
      console.log(error);
    }
  }
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

  useEffect(() => {
    const fetchTeachers = async () => {
      const fetchedTeacherData = [];
      for (let i = 0; i < profile.mycurs.length; i++) {
        const response = await axios.get(
          "https://api.ilmlar.com/courses/" + profile.mycurs[i].cursId,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        fetchedTeacherData.push(response.data);
      }
      setTeacherData(fetchedTeacherData);
    };

    if (profile.teachers) {
      fetchTeachers();
    }
  }, [profile]);

  return (
    <div className="carts-wrapper">
      {teacherData.map((item, index) => (
        <div onClick={() => {navigate("/student/kurs/" + item._id)}} className="cursor_bought_class bought_lessons">
        <img
          src={
            "https://api.ilmlar.com" + deleteplatforma(item.obloshka)
          }
          alt=""
        />
        <div className="text_info">
          <p>{item?.Kursname}</p>
          <strong>{item?.Kursdesc}</strong>
        </div>
      </div>
      ))}
    </div>
  );
};

export default memo(Darslar);

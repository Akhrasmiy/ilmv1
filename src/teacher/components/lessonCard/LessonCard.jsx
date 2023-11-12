import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { MoreOutlined, EyeOutlined, EditOutlined, BarChartOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";


import "./index.css";
const LessonCard = (props) => {
  const where = props.where;
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
  const navigate = useNavigate();
  let courseId = props.cart._id;
  const items = [
    {
      label: <Link to={"/teacher/course/" + courseId}><EyeOutlined /> kursni ko'rish</Link>,
      key: "0",
    },
    {
      label: <Link to={"/teacher/update/kurs/"+courseId}><EditOutlined /> kursni yangilash</Link>,
      key: "1",
    },
    {
      label: <Link to={"/teacher/statistic/" + courseId}><BarChartOutlined /> kursni statistikasi</Link>,
      key: "2",
    },
   
  ];
  return (
    <div
      style={{ cursor: "pointer" }}
      // onClick={() => {
      //   if (where == "lesson") {
      //     navigate("/teacher/course/" + courseId);
      //   } else if (where == "statistik") {
      //     navigate("/teacher/statistic/" + courseId);
      //   } else if (where == "update") {
      //     navigate("/teacher/update/kurs/" + courseId);
      //   }
      // }
    // }
      className="col-span-1"
    >
      <div className="main-cart">
        <img
          src={"https://api.ilmlar.com" + deleteplatforma(props.cart.obloshka)}
          alt=""
        />
        <div className="cart__content">
          <h3>{props.cart.Kursname}</h3>
          <p>{props.cart.Kursdesc}</p>
        </div>
        <Dropdown className="position_icon" menu={{ items }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MoreOutlined style={{ fontSize: '20px', color: '#fff' }} />
          </Space>
        </a>
      </Dropdown>
      
      </div>
      
    </div>
  );
};

export default LessonCard;

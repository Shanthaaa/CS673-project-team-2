import React, { useState } from "react";
import {
  ClockCircleOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu } from "antd";
import logo from "../../static/images/logo.png";
import "./index.css";
import RubiksCubeDemo from "./components/RubiksCubeDemo";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

//menu items
const items: MenuProps["items"] = [
  {
    label: <img src={logo} alt="logo" className="logo" />,
    key: "logo",
  },
  {
    label: "Rules & Regulations",
    key: "rules",
    icon: <QuestionCircleOutlined />,
    style: { position: "absolute", right: "50px" },
  },
  // {
  //   label: "Progress Tracking",
  //   key: "progress",
  //   icon: <ClockCircleOutlined />,
  //   style: { position: "absolute", right: "300px" },
  // },
  // {
  //   label: "Settings",
  //   key: "settings",
  //   style: { position: "absolute", right: "100px" },
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       type: "group",
  //       children: [
  //         {
  //           label: "Login",
  //           key: "login",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

const Home: React.FC = () => {
  //save current selected memu item
  const [current, setCurrent] = useState("");

  const navigate = useNavigate();

  //when click rules item, navigate to rules page
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "rules") {
      navigate("/rules");
    }
  };

  //navigate to Rubik's Cube page
  const goToRubiksCube = () => {
    navigate("/rubikscube");
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FFFFFF",
        },
        components: {
          Menu: {
            horizontalItemHoverColor: "#FFFFFF",
            itemHoverColor: "#FFFFFF",
          },
        },
      }}
    >
      <div>
        <Menu
          className="menu"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        {/* show demo of Rubik's Cube */}
        <RubiksCubeDemo />
        <Button className="play-button" onClick={goToRubiksCube}>
          Play Game
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default Home;

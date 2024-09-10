import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MdContacts } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FaList, FaHandsHelping } from "react-icons/fa";
import { AiFillTags } from "react-icons/ai";
import PropTypes from "prop-types";
import {
  FaDesktop,
  FaHashtag,
  FaRegNewspaper,
  FaPodcast,
} from "react-icons/fa6";
import { SlEnvolopeLetter } from "react-icons/sl";

import { IoMicOutline } from "react-icons/io5";

const MenuList = ({ darkTheme }) => {
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu_bar"
    >
      <Menu.Item key="home" icon={<RxDashboard className="dashbord_icon" />}>
        <Link to="/dashboard" className="route_link">
          Dashbord
        </Link>
      </Menu.Item>

      <Menu.Item
        key="contactCategory"
        icon={<MdContacts className="dashbord_icon" />}
      >
        <Link to="/dashboard/client" className="route_link">
          Client
        </Link>
      </Menu.Item>

      {/* 
      <Menu.Item
        key="setting"
        icon={<SettingOutlined className="dashbord_icon" />}
      >
        Setting
      </Menu.Item> */}
    </Menu>
  );
};

MenuList.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};

export default MenuList;

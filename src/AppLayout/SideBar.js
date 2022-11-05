import {
  UnorderedListOutlined,
  FileSearchOutlined,
  SendOutlined,
} from "@ant-design/icons";
import "../App.css";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Link } from "react-router-dom";
const { Sider } = Layout;

const items = [
  {
    label: "Dashboard",
    key: "masters",
    icon: <UnorderedListOutlined />,
    children: [


      {
        label: (
          <Link
            style={{ color: "inherit" }}
            to={`/masters/allfiles/dashboardreader`}
          >
            Dashboard
          </Link>
        ),
        key: "dispatch",
        icon: <SendOutlined />,
      },

    ],
  },
];

export default function SideBar({ collapsed, onCollapse }) {
  // const [collapsed, setCollapsed] = useState(false);

  return (
    // <div className="SideBar">
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="sidebar-component"
      width={'var(--sidebarOpenWidth)'}
      collapsedWidth={'var(--sidebarClosedWidth)'}
    >
      <div
        className="logo"
        style={{
          height: "63px",
          background: "white",
        }}
      >
        {collapsed ? (
          <img
            // src="/DHL_logo.png"
            alt="logo"
            style={{
              width: 77,
              float: "left",
            }}
          ></img>
        ) : (
          <img
            // src="/DHL_logo.png"
            alt="logo"
            style={{
              width: 190,
              padding: "10px",
            }}
          ></img>
        )}
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Layout.Sider>
    // </div>
  );
}

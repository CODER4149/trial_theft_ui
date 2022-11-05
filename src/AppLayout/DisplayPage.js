import "../App.css";
import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import React from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { useNavigate, Outlet } from "react-router-dom";
const { Header, Content } = Layout;

export default function DisplayPage() {
  const navigate = useNavigate();

  return (
    <Layout className="site-layout">
      <Layout.Header
        className="site-layout-background"
        style={{
          padding: 0,
          backgroundColor: "#002140",
        }}
      >
        <Button
          type="primary"
          style={{ margin: "1%", float:"right" }}
          icon={<LogoutOutlined />}
          onClick={() => {
            localStorage.setItem("isLoggedIn", "false");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Layout.Header>
      <Layout.Content
        className="main-content-div"
      >
        {/* <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
              >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb> */}

        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: "100%",
          }}
        >
          <Outlet />
        </div>
      </Layout.Content>
    </Layout>
  );
}

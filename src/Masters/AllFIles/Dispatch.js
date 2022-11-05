import React, { useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import { Upload, message, Card, Button, Input, Row, Col, Form } from "antd";
import {  UploadOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Dispatch() {
  
  const [fileList, setFileList] = useState();

  const API_IP_Port = "http://192.168.1.187:5023";
  const API_Path = API_IP_Port + "/dispatch/dispatch_file_with_update_dispatch_status_excel";

  function uploadFilesToServer(values) {
    
    // console.log("Filename_1", fileList[0]);
    console.log("fileName", fileList[0].originFileObj);

    let Payload = new FormData();

    Payload.append("file", fileList[0].originFileObj);

    axios.post(API_Path, Payload)
      .then((res) => {
        console.log("res", res);
        res.status === 200
          ? message.success("File Uploaded Successfully")
          : message.error("File Upload Failed");
        if (res.status === 200) {
          setFileList([]);
        }
      })
      .catch((err) => {
        message.error("File Upload Failed");
        console.log("err", err);
      });
  }

  return (
    <div className="locate_container">
      <Card
        title="Dump Your File"
        style={{
          width: "50%",
        }}
      >
        <Row>
          <Col span={12}>
            <Form
              name="nest-messages"
              onFinish={(values) => {
                uploadFilesToServer(values);
              }}
            >
              {/* <Form.Item
                name={["name"]}
                label="File Name : "
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item> */}

              <Form.Item
                name={["xlsx"]}
                label="XLSX File : "
                rules={[{ required: true }]}
              >
                <Upload
                  name="xlsx_file"
                  accept=".xlsx"
                  maxCount={1}
                  fileList={fileList}
                  onPreview={(file) => {
                    // console.log("fileUrl", file.url);
                  }}
                  onChange={({ fileList }) => {
                    setFileList(fileList);
                    console.log("fileList", fileList);
                  }}
                  beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                >
                    <Button
                      type="primary"
                      shape="round"
                      icon={<UploadOutlined />}
                      size={"large"}
                    >
                      Upload File
                    </Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button
                  className="btn-btn-size"
                  htmlType="submit"
                  type="primary"
                  shape="round"
                  size={"large"}
                >
                  Call API
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
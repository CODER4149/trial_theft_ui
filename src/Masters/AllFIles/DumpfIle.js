import React, { useState } from "react";
import "antd/dist/antd.css";
import "../../App.css";
import { Upload, message, Card, Button, Input, Row, Col, Form } from "antd";
import {  UploadOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Dumpfile() {
  
  const [fileList, setFileList] = useState();
  


  const API_IP_Port = "http://192.168.1.187:5023";
  const API_Path = API_IP_Port + "/dispatch/dispatch_file_item_excel?file_name=";


  function uploadFilesToServer(values) {
    
    console.log("fileName", fileList[0].originFileObj);

    let Payload = new FormData();

    Payload.append("file", fileList[0].originFileObj);

    axios.post(API_Path+values.name+"&vehical_number="+values.vehical_number+"&total_items="+values.total_items
              // +"&date="+values.date
              // +"&user_id="+values.user_id+"&store_id="+values.store_id
              , Payload)
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
          <Col span={24}>
            <Form
              name="nest-messages"
              onFinish={(values) => {
                uploadFilesToServer(values);
              }}
            >
              <Form.Item
                name={["name"]}
                label="File Name : "
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={["vehical_number"]}
                label="Vehical Number : "
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={["total_items"]}
                label="Total Items : "
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              {/* <Form.Item
                name={["date"]}
                label="Date : "
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={["user_id"]}
                label="User ID : "
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={["store_id"]}
                label="Store ID : "
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
                    console.log("fileUrl", file.url);
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
                  Add File
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

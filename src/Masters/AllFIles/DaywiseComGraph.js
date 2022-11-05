
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { Upload, message, Card, Button, Input, Row, Col, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Tabs } from 'antd';
// import type { DatePickerProps } from 'antd';

import { DatePicker, Space } from 'antd'
import * as moment from 'moment'
import { Collapse } from "antd";
import { DualAxes } from '@ant-design/plots';
const { Panel } = Collapse;
const DemoColumn = () => {
  // if (Object.keys(fileList).length!=0){
  //     setDisplayGraph(true)

  // }else{
  //     setDisplayGraph(true)
  // }
  var [display_graph, setDisplayGraph] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [theftlist, setTheftList] = useState([]);

  const API_IP_Port = "http://192.168.1.187:5015";
  const API_Path = API_IP_Port + "/trial_room/sale_tag_wrt_trial_room";

  function GetTheftData(values) {


    console.log("store_id", values.store_id);


    let date = moment(values.date).format("YYYY-MM-DD 00:00:00");

    console.log("store_id", date);

    let Payload = new FormData();

    Payload.append("store_id", parseInt(values.store_id));

    Payload.append("date", date);


    axios.get('https://tagidapi.smart-iam.com/test' + "/theft_detection/Analysis_selling_data?created_date=" + date + "&store_id=" + values.store_id, Payload)
      .then((res) => {
        console.log("res", res);
        res.status === 200
          ? message.success("open graph")
          : message.error("File Upload Failed");
        if (res.status === 200) {
          console.log([res.data])
          setTheftList([res.data]);
          //   JSON.stringify(fileList)
        } else {
          setTheftList([]);
        }
      })
      .catch((err) => {
        message.error("File Upload Failed");
        console.log("err", err);
      });
  }

  function GetTrialRoomData(values) {

    console.log("Filename_1", values);
    console.log("store_id", values.store_id);
    console.log("reader_id", values.reader_id);
    console.log("trial_room_id", values.trial_room_id);

    let date = moment(values.date).format("YYYY-MM-DD 00:00:00");

    console.log("store_id", date);

    let Payload = new FormData();

    Payload.append("store_id", parseInt(values.store_id));
    Payload.append("reader_id", parseInt(values.reader_id));
    Payload.append("date", date);
    Payload.append("trial_room_id", parseInt(values.trial_room_id));

    axios.post(API_Path, Payload)
      .then((res) => {
        console.log("res", res);
        res.status === 200
          ? message.success("open graph")
          : message.error("File Upload Failed");
        if (res.status === 200) {

          setFileList(res.data);
          //   JSON.stringify(fileList)
        } else {
          setFileList([]);
        }
      })
      .catch((err) => {
        message.error("File Upload Failed");
        console.log("err", err);
      });
  }

  const config = {
    appendPadding: 10,
    data: fileList,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };


  const data = [
    {
      action: '浏览网站',
      pv: 50000,
    },
    {
      action: '放入购物车',
      pv: 35000,
    },
    {
      action: '生成订单',
      pv: 25000,
    },
    {
      action: '支付订单',
      pv: 15000,
    },
    {
      action: '完成交易',
      pv: 8500,
    },
  ];
  const config1 = {
    data: [theftlist, theftlist],
    xField: 'percent_matched',
    yField: ['sale_data', 'theft_reader_data'],
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        color: '#5AD8A6',
      },
    ],
  };
  //   const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString);
  // };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Trial room" key="1">
          <Form
            layout="inline"
            name="get_date"
            onFinish={(values) => {
              GetTrialRoomData(values);
            }}
          >


            <Form.Item
              name="date"
              label="Date : "
              rules={[{ required: true }]}
            >

              <DatePicker onChange={onChange} />
            </Form.Item>
            <Form.Item
              label="Store Id"
              name="store_id"
              rules={[{ required: true, message: 'Store Id is required!' }]}>
              <Input placeholder="Store Id" required />
            </Form.Item>
            <Form.Item
              label="Trial room Id"
              name="trial_room_id"
            >
              <Input placeholder="Trial room Id" />
            </Form.Item>
            <Form.Item
              label="Reader Id"
              name="reader_id">
              <Input placeholder="Reader Id" />
            </Form.Item>
            <Form.Item>
              <Button

                htmlType="submit"
                type="primary"

                size={"midium"}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          {/* </Row> */}
          <Collapse isOpened={true}>
            <Panel header="Show Graph" key="1">
              <Pie {...config} />
            </Panel>
          </Collapse>
          {/* <Pie {...config} />; */}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theft detection" key="2">
          <Form
            layout="inline"
            name="get_date"
            onFinish={(values) => {
              GetTheftData(values);
            }}
          >


            <Form.Item
              name="date"
              label="Date : "
              rules={[{ required: true }]}
            >

              <DatePicker onChange={onChange} />
            </Form.Item>
            <Form.Item
              label="Store Id"
              name="store_id"
              rules={[{ required: true, message: 'Store Id is required!' }]}>
              <Input placeholder="Store Id" required />
            </Form.Item>

            <Form.Item>
              <Button

                htmlType="submit"
                type="primary"

                size={"midium"}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          {/* </Row> */}
          <Collapse isOpened={true}>
            <Panel header="Show Graph" key="1">
              <DualAxes {...config1} />
            </Panel>
          </Collapse>
        </Tabs.TabPane>

      </Tabs>

      {/* <Row> */}


    </div>
  );

  //   return 
};


export default DemoColumn;

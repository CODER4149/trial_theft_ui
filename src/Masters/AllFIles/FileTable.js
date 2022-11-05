import { Button, message, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileAddOutlined } from "@ant-design/icons";

export default function FileTable() {
  var [dataSource, setDataSource] = useState([]);

  const API_IP_Port = `http://192.168.1.187:5023`;

  function getData() {
    const API_Path = API_IP_Port + `/dispatch/fetch_all_files`;
    axios
      .get(API_Path)
      .then((response) => {
        setDataSource(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const columns = [
    {
      title: "File id",
      dataIndex: "file_id",
      key: "file_id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "File name",
      dataIndex: "file_name",
      key: "file_name",
    },
    {
      title: "Vehical number",
      dataIndex: "vehical_number",
      key: "vehical_number",
    },
    {
      title: "Total items",
      dataIndex: "total_items",
      key: "total_items",
    },
    {
      title: "Store ID",
      dataIndex: "store_id",
      key: "store_id",
    },
    {
      title: "Action",
      dataIndex: "file_id",
      key: "file_id",
      align: "center",
      render: (record) => (
        <>
          {
            <Button
              type="danger"
              onClick={() => {
                console.log(record);
                const API_Delete =
                  API_IP_Port + `/files/delete?file_id=${record}`;
                let Payload = new FormData();
                Payload.append("file_id", parseInt(record));
                axios
                  .get(API_Delete)
                  .then((response) => {
                    // console.log(response);
                    if (response.status === 200) {
                      getData();
                      message.success("File Deleted Successfully");
                    } else {
                      message.error("File Deletetion Failed");
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              Delete
            </Button>
          }
        </>
      ),
    },
  ];

  return (
    <div className="FileTable">
      <Button
        style={{ float: "right", marginBottom: "1%" }}
        type="primary"
        icon={<FileAddOutlined />}
        onClick={() => {
          navigate("/masters/allfiles/dumpfile");
        }}
      >
        Add File
      </Button>
      <Table scroll={{ y: 550 }} dataSource={dataSource} columns={columns} />
    </div>
  );
}

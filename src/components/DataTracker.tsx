import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PieChartOutlined, BorderVerticleOutlined } from "@ant-design/icons";

interface DataType {
  key: React.Key;
  month: string;
  status: string;
  completion: string;
  bu: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "MONTH",
    dataIndex: "month",
    align: "center",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    align: "center",
  },
  {
    title: "COMPLETION",
    dataIndex: "completion",
    align: "center",
  },
  {
    title: "BUSINESS UNIT",
    dataIndex: "bu",
    align: "center",
  },
];

const data: DataType[] = [
  {
    key: 0,
    month: "JAN 2023",
    status: "Approved",
    completion: "20%",
    bu: "Business Unit 1",
  },
  {
    key: 0,
    month: "FEB 2023",
    status: "Pending Approval",
    completion: "30%",
    bu: "Business Unit 1",
  },
  {
    key: 0,
    month: "MARCH 223",
    status: "Incomplete",
    completion: "50%",
    bu: "Business Unit 1",
  },
];

const DataTracker: React.FC = () => {
  return (
    <>
      <div className="flex-center">
        <div className="block">
          <div>
            <p className="grey">Pending Trackers</p>
            <h1>45/60</h1>
          </div>
          <PieChartOutlined className="icon" />
        </div>
        <div className="block">
          <div>
            <p className="grey">Pending Reviews</p>
            <h1>3</h1>
          </div>
          <BorderVerticleOutlined className="icon" />
        </div>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default DataTracker;

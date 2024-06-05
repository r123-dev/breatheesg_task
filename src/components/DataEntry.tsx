import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';
import { AssessmentDataType } from '../@d.types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAssessments } from '../store/reducers/assessment';
import { insertAssessments } from '../services/database';

const DataEntry: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const dispatch = useAppDispatch();
  const assessments: AssessmentDataType[] = useAppSelector((state) => state.assessment.assessments);
  const uid = useAppSelector((state) => state.user.uid);
  
  const handleDelete = async (record: AssessmentDataType, e: React.MouseEvent) => {
    const updatedAssessments: AssessmentDataType[] = assessments.filter((rec) => rec !== record);
    await insertAssessments(updatedAssessments, uid)
            .then(() => {
                dispatch(setAssessments({ assessments: updatedAssessments }));
            })
            .catch((error) => alert(error.message));
  };

  const columns: ColumnsType<AssessmentDataType> = [
    {
      title: 'ASSESSMENT TITLE',
      dataIndex: 'assessment',
      align: 'center'
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      align: 'center'
    },
    {
      title: 'NO OF SUPPLLIERS',
      dataIndex: 'nos',
      align: 'center'
    },
    {
      title: 'SCORE',
      dataIndex: 'score',
      render: () => "-",
      align: 'center'
    },
    {
      title: 'RISK CLASSIFICATION',
      dataIndex: 'rc',
      align: 'center'
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: () => "Pending",
      align: 'center'
    },
    {
      title: 'RESULT',
      dataIndex: 'result',
      render: () => "-",
      align: 'center'
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      render: (text, record) => (
        <span onClick={(e) => handleDelete(record, e)}>
          <DeleteOutlined />
        </span>
      ),
      align: 'center'
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table style={{zIndex: "unset"}} rowSelection={rowSelection} columns={columns} dataSource={assessments} />
  );
}

export default DataEntry;


import { Button, Select, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout'
import { DatabaseOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import DataEntry from './DataEntry';
import DataTracker from './DataTracker';
import InputModal from './InputModal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTab } from '../store/reducers/tab';

const DataManager: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const tab = useAppSelector((state) => state.tab.tab);
    const dispatch = useAppDispatch();
    const openModal = async (e: React.MouseEvent) => {
        setIsModalOpen(true);
    }
    const closeModal = async () => {
        setIsModalOpen(false);
    }
    const handleTabClick = () => {
        dispatch(toggleTab());
    };

    return (
        <>
            <div className='large-screen-header'>
                <Header className='header-child'>
                    <div className="tab-switcher">
                        <div className={`tab ${tab ? '' : 'active'}`} onClick={() => handleTabClick()}>
                            {<DatabaseOutlined />} Data Entry
                        </div>
                        <div className={`tab ${tab ? 'active' : ''}`} onClick={() => handleTabClick()}>
                            {<IssuesCloseOutlined />} Data Tracker
                        </div>
                    </div>
                    <div className='fixed' />
                    <Typography className='genText'>For:
                        <Select
                            defaultValue="FY 2023-24"
                            options={[
                                { value: '23', label: 'FY 2023-24' },
                                { value: '22', label: 'FY 2022-23' },
                                { value: '21', label: 'FY 2021-22' }
                            ]}
                        />
                    </Typography>
                    {!tab &&
                        <Button size='large' onClick={openModal} className='headerButton'>Submit for Approval</Button>
                    }
                </Header>
            </div>
            <InputModal closeModal={closeModal} open={isModalOpen} />
            <Content className='content-child'>
                {!tab && <DataEntry />}
                {tab&& <DataTracker />}
            </Content>
        </>
    )
}

export default DataManager

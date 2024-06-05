import { Button, Select, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react'
import { auth } from '../config/firebase';
import whitelogo from '../images/whitelogo.png'
import { UserOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { LSHeader } from '../@d.types';
import { useAppSelector } from '../store/hooks';
import { exportData } from '../services/export';

const LargeScreenHeader: React.FC<LSHeader> = ({toggleSider}: LSHeader) => {
    const user = auth.currentUser;
    const assessments = useAppSelector((state) => state.assessment.assessments);
    const handleExport = (e: React.MouseEvent) => {
        assessments ? exportData(assessments) : alert("No Data Present");
    }

    return (
        <div className="large-screen-header">
            <Header className="header">
                <Button
                    type="text"
                    icon={<DoubleLeftOutlined />}
                    onClick={toggleSider}
                    className="collapse-button"
                />
                <img alt='logo' src={whitelogo} width="50px" height="50px" />
                <Typography className="genText">
                    {user?.displayName ? user.displayName.toLocaleUpperCase() : 'View Name'}
                    <Select defaultValue="North Indian Region"
                        options={[{ value: 'North Indian Region', label: 'North Indian Region' },
                        { value: 'South Indian Region', label: 'South Indian Region' }]}
                    />
                </Typography>
                <div className="fixed" />
                <Button
                    type="primary"
                    onClick={handleExport}
                    className='header-button'
                >Export Data Entry
                </Button>
                {user?.displayName ? user.displayName.toUpperCase() : 'No Name Provided'}
                {user?.photoURL ? <img alt='logo' src={user.photoURL} width="30px" height="30px" /> : <UserOutlined />}
            </Header>
        </div>
    )
}

export default LargeScreenHeader;

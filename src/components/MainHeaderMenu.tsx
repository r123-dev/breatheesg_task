import { Button, Menu, Select } from 'antd'
import React from 'react'
import { auth } from '../config/firebase';
import {
    UserOutlined
} from '@ant-design/icons';
import { useAppSelector } from '../store/hooks';
import { exportData } from '../services/export';

const MainHeaderMenu: React.FC = () => {
    const user = auth.currentUser;
    const assessments = useAppSelector((state) => state.assessment.assessments);
    const handleExport = (e: React.MouseEvent) => {
        assessments ? exportData(assessments) : alert("No Data Present");
    }
    return (
        <Menu className='menu'>
            <Menu.Item disabled>
                <Select defaultValue="North Indian Region" className='menu-item'
                    options={[{ value: 'North Indian Region', label: 'North Indian Region' },
                    { value: 'South Indian Region', label: 'South Indian Region' }]}
                />
            </Menu.Item>
            <Menu.Item disabled>
                <div className='menu-item'>
                    {user?.displayName ? user.displayName.toUpperCase() : 'No Name Provided'}&nbsp;&nbsp;&nbsp;
                    {user?.photoURL ? <img alt='logo' src={user.photoURL} width="40px" height="30px" /> : <UserOutlined />}
                </div>
            </Menu.Item>
            <Menu.Item disabled>
                <div
                    onClick={handleExport}
                    className='menu-item'
                >Export Data Entry
                </div>
            </Menu.Item>
        </Menu>
    )
}

export default MainHeaderMenu

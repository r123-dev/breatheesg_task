import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react'
import whitelogo from '../images/whitelogo.png'
import { DoubleLeftOutlined, MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { SSHeader } from '../@d.types';

const SmallScreenHeader: React.FC<SSHeader> = ({toggleSider, toggleMenu, toggleDataMenu}: SSHeader) => {
    return (
        <div className="small-screen-header">
            <Header className="header">
                <Button
                    type="text"
                    icon={<DoubleLeftOutlined />}
                    onClick={toggleSider}
                />
                <img src={whitelogo} alt="logo" width="30" height="30" />
                <div className="fixed" />
                <Button
                    type="text"
                    icon={<MenuFoldOutlined />}
                    onClick={toggleMenu}
                />
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={toggleDataMenu}
                />
            </Header>
        </div>
    )
}

export default SmallScreenHeader

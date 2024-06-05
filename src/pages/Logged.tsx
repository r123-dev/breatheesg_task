import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import logo from '../images/logo.webp'
import { Layout } from 'antd';
import {  StateGlobalProviderProps } from '../@d.types';
import DataManagerMenu from '../components/DataManagerMenu';
import MainHeaderMenu from '../components/MainHeaderMenu';
import NormalSiderMenu from '../components/NormalSiderMenu';
import LargeScreenHeader from '../components/LargeScreenHeader';
import SmallScreenHeader from '../components/SmallScreenHeader';


const { Content, Sider } = Layout;

const Logged: React.FC<StateGlobalProviderProps> = ({ children }: StateGlobalProviderProps) => {

    const auth = getAuth();
    const [collapsed, setCollapsed] = useState(false);
    const [menu, setMenu] = useState(false);
    const [dataMenu, setDataMenu] = useState(false);
    const user = auth.currentUser;
    const navigate = useNavigate();

    const toggleSider = () => {
        setDataMenu(false);
        setMenu(false);
        setCollapsed(!collapsed);
    };

    const toggleMenu = () => {
        setDataMenu(false);
        setCollapsed(menu);
        setMenu(!menu);
    };

    const toggleDataMenu = () => {
        setMenu(false);
        setCollapsed(dataMenu);
        setDataMenu(!dataMenu);
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate])

    return (
        <Layout className='layout' hasSider>
            {collapsed ? '' :
                <Sider className='sider'>
                    <div className="logo-vertical">
                        <img
                            alt='logo'
                            src={logo}
                            width="35px"
                            height="35px" /> {collapsed ? '' : "BREATHE ESG"}
                    </div>
                    {dataMenu ? <DataManagerMenu /> :
                        <>
                            {
                                menu ? <MainHeaderMenu /> :
                                    <NormalSiderMenu />
                            }
                        </>
                    }
                </Sider>
            }
            <Layout className='layout-children'>
                <div>
                    <LargeScreenHeader toggleSider={toggleSider} />
                    <SmallScreenHeader
                        toggleDataMenu={toggleDataMenu}
                        toggleMenu={toggleMenu}
                        toggleSider={toggleSider}
                    />
                </div>
                <Content className='content'>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default Logged;

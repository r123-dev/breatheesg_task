import { Menu } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOutLocal } from '../services/auth';
import { BarChartOutlined ,DatabaseOutlined, RadarChartOutlined, LogoutOutlined, FileProtectOutlined,
    UserSwitchOutlined, FundOutlined, StockOutlined, AuditOutlined
} from '@ant-design/icons';
import { MenuItem } from '../@d.types';

const NormalSiderMenu: React.FC = () => {

    const menuItems: MenuItem[] = [
        { icon: <BarChartOutlined />, label: "Dashboard", route: "/user/dashboard" },
        { icon: <AuditOutlined />, label: "Entity Manager", route: "/user/em" },
        { icon: <DatabaseOutlined />, label: "Data Manager", route: "/user/dm" },
        { icon: <FileProtectOutlined />, label: "Reporting", route: "/user/reporting" },
        { icon: <FundOutlined />, label: "Materiality", route: "/user/matrial" },
        { icon: <UserSwitchOutlined />, label: "Suppliers", route: "/user/suppliers" },
        { icon: <StockOutlined />, label: "Analytics", route: "/user/analytics" },
        { icon: <RadarChartOutlined />, label: "Targets", route: "/user/targets" },
    ];
    
    const menuItemsWithRoutes = menuItems.map((item, index) => ({
        key: String(index + 1),
        icon: item.icon,
        label: item.label,
        route: item.route,
    }));

    const navigate = useNavigate();

    const handleLogout = async (e: React.MouseEvent) => {
        await signOutLocal();
        navigate('/');
    }
    return (
        <Menu className="menu" theme="dark" mode="inline" defaultSelectedKeys={['3']}>
            {menuItemsWithRoutes.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={`${item.route}`}>{item.label}</Link>
                </Menu.Item>
            ))}
            <Menu.Item className='red' icon={<LogoutOutlined />} >
                <p onClick={handleLogout}>Logout</p>
            </Menu.Item>
        </Menu>
    )
}

export default NormalSiderMenu

import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
    DashboardOutlined
} from '@ant-design/icons';

export const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

export const menus = [
    {
        key:'dashboard',
        label:'Dashboard',
        icon: DashboardOutlined
    },
    {
        key:'users',
        label:'Users',
        icon: UserOutlined
    },
    {
        key:'events',
        label:'Events',
        icon: NotificationOutlined
    },
    {
        key:'aboutus',
        label:'AboutUs',
        icon: NotificationOutlined
    },
    {
        key:'program',
        label:'program',
        icon: NotificationOutlined
    }
]
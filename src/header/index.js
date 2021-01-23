import { useLocation } from 'react-router-dom';
import { ROUTE_NAMES } from '../consts';
import { Typography } from 'antd';
import './index.scss';

const { Title } = Typography;

export default function Header() {
  const { pathname } = useLocation();

  return (
    <div className="app-box app-header">
      <Title level={3}>{ROUTE_NAMES[pathname]}</Title>
    </div>
  );
}

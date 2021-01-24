import { useLocation } from 'react-router-dom';
import { ROUTE_NAMES, ROUTE_DESCRIPTIONS } from '../consts';
import { Typography } from 'antd';
import './index.scss';

const { Title } = Typography;

export default function Header() {
  const { pathname } = useLocation();

  return (
    <div className="app-box app-header">
      <Title level={3}>{ROUTE_NAMES[pathname]}</Title>
      <Title level={4}>{ROUTE_DESCRIPTIONS[pathname]}</Title>
    </div>
  );
}

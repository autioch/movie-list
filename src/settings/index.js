import './index.scss';
import { Typography } from 'antd';
import ItemDetails from './itemDetails';
import FilterConfig from './filterConfig';

const { Title } = Typography;

export default function StatList() {
  return (
    <div className="settings">
      <Title level={3}>Settings</Title>
      <ItemDetails />
      <FilterConfig />
    </div>
  );
}
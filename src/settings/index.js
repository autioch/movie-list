import ItemDetails from './itemDetails';
import FilterConfig from './filterConfig';
import { Alert } from 'antd';
import './index.scss';

export default function StatList() {
  return (
    <div>
      <Alert message="All settings are saved separately for each device." type="info" />
      <ItemDetails />
      <FilterConfig />
    </div>
  );
}

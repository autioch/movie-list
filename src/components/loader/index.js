import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './index.scss';

export default function Loader() {
  return (
    <div className="loader">
      <Spin indicator={<LoadingOutlined style={{
        fontSize: 60 // eslint-disable-line no-magic-numbers
      }} spin />} />
    </div>
  );
}

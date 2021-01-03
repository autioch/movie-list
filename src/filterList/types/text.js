import { Input } from 'antd';
import { NO_VALUE } from '../../consts';

export default function TextView({ filterId, value = '', setFilterValue }) {
  return (
    <Input value={value} onChange={(ev) => setFilterValue(filterId, ev.target.value || NO_VALUE)} />
  );
}

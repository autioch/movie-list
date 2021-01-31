import { Input } from 'antd';
import { NO_VALUE } from '../../../consts';

export default function TextView({ value = '', setFilterValue }) {
  return (
    <Input value={value} onChange={(ev) => setFilterValue(ev.target.value || NO_VALUE)} />
  );
}

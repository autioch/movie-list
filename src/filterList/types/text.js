import { Input } from 'antd';

export default function TextView({ filter: { id, value = '' }, setFilterValue }) {
  return (
    <Input value={value} onChange={(ev) => setFilterValue(id, ev.target.value)} />
  );
}

import { Input, Typography } from 'antd';

const { Title } = Typography;

export default function RangeView({ filter: { id, label, fromValue, toValue, minValue, maxValue }, setFilterValue }) {
  return (
    <>
      <Title level={5}>From</Title>
      <Input
        value={fromValue}
        title={`Set minimum ${label}`}
        placeholder={minValue}
        onChange={(ev) => setFilterValue(id, {
          fromValue: ev.target.value,
          toValue
        })}
      />
      <Title level={5}>To</Title>
      <Input
        value={toValue}
        title={`Set maximum ${label}`}
        placeholder={maxValue}
        onChange={(ev) => setFilterValue(id, {
          fromValue,
          toValue: ev.target.value
        })}
      />
    </>
  );
}

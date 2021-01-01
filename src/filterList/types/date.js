import { Input, Typography } from 'antd';

const { Title } = Typography;

export default function DateView({ filter: { id, label, value = {}, minDate, maxDate }, setFilterValue }) {
  const { fromDate = '', toDate = '' } = value;

  return (
    <>
      <Title level={5}>From</Title>
      <Input
        value={fromDate}
        title={`Set minimum ${label}`}
        placeholder={minDate}
        onChange={(ev) => setFilterValue(id, {
          fromValue: ev.target.value,
          toDate
        })}
      />
      <Title level={5}>To</Title>
      <Input
        value={toDate}
        title={`Set maximum ${label}`}
        placeholder={maxDate}
        onChange={(ev) => setFilterValue(id, {
          fromDate,
          toDate: ev.target.value
        })}
      />
    </>
  );
}

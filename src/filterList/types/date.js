import { Input, Typography } from 'antd';
import { uniqValues } from '../utils';
import { NO_VALUE } from '../../consts';

const { Title } = Typography;

const checkValue = (val) => {
  const toDate = new Date(val);

  if (isNaN(toDate.getTime())) {
    return NO_VALUE;
  }

  return toDate.toISOString();
};

export default function DateView({ filterId, label, value = {}, items, setFilterValue }) {
  const { fromDate = '', toDate = '' } = value;

  const options = uniqValues(items, filterId).map(parseFloat).filter((val) => !isNaN(val))
    .sort((aa, bb) => aa - bb);

  return (
    <>
      <Title level={5}>From</Title>
      <Input
        value={fromDate}
        title={`Set minimum ${label}`}
        placeholder={options[0]}
        onChange={(ev) => setFilterValue(filterId, {
          fromValue: checkValue(ev.target.value),
          toDate
        })}
      />
      <Title level={5}>To</Title>
      <Input
        value={toDate}
        title={`Set maximum ${label}`}
        placeholder={options[options.length - 1]}
        onChange={(ev) => setFilterValue(filterId, {
          fromDate,
          toDate: checkValue(ev.target.value)
        })}
      />
    </>
  );
}

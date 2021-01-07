import { Input, Typography } from 'antd';
import { uniqValues } from '../../utils';
import { NO_VALUE } from '../../consts';

const { Title } = Typography;
const checkValue = (val) => val === null || val === '' ? NO_VALUE : val; // eslint-disable-line no-confusing-arrow

export default function RangeView({ filterId, label, value = {}, items, setFilterValue }) {
  const { fromValue, toValue } = value;

  const options = uniqValues(items, filterId).map(parseFloat).filter((val) => !isNaN(val))
    .sort((aa, bb) => aa - bb);

  return (
    <>
      <Title level={5}>From</Title>
      <Input
        value={fromValue}
        title={`Set minimum ${label}`}
        placeholder={options[0]}
        onChange={(ev) => setFilterValue({
          fromValue: checkValue(ev.target.value),
          toValue
        })}
      />
      <Title level={5}>To</Title>
      <Input
        value={toValue}
        title={`Set maximum ${label}`}
        placeholder={options[options.length - 1]}
        onChange={(ev) => setFilterValue({
          fromValue,
          toValue: checkValue(ev.target.value)
        })}
      />
    </>
  );
}

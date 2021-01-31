import { Input } from 'antd';
import { uniqValues } from '../utils';
import { NO_VALUE } from '../../../consts';

const checkValue = (val) => {
  const toDate = new Date(val);

  if (isNaN(toDate.getTime())) {
    return NO_VALUE;
  }

  return toDate.toISOString();
};

export default function DateView({ filterId, label, value = {}, items, setFilterValue }) {
  const { fromDate = '', toDate = '' } = value;

  const options = uniqValues(items, filterId).sort((aa, bb) => aa - bb);

  return (
    <>
      <div className="filter-label">From</div>
      <Input
        value={fromDate}
        title={`Set minimum ${label}`}
        placeholder={options[0]}
        onChange={(ev) => setFilterValue({
          fromDate: checkValue(ev.target.value),
          toDate
        })}
      />
      <div className="filter-label">To</div>
      <Input
        value={toDate}
        title={`Set maximum ${label}`}
        placeholder={options[options.length - 1]}
        onChange={(ev) => setFilterValue({
          fromDate,
          toDate: checkValue(ev.target.value)
        })}
      />
    </>
  );
}

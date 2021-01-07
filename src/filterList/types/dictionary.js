import { Select } from 'antd';
import { uniqValues } from '../../utils';
import { IGNORED, NO_VALUE } from '../../consts';

const { Option } = Select; // eslint-disable-line no-shadow

export default function DictionaryView({ filterId, label, value, items, setFilterValue }) {
  const options = uniqValues(items, filterId).filter((val) => !IGNORED[val]).sort();

  return (
    <Select
      onChange={(newValue) => setFilterValue(newValue || NO_VALUE)}
      value={value}
      title={`Filter by ${label}`}
    >
      {options.map((option, index) => <Option key={index} value={option}>{option}</Option>)}
    </Select>
  );
}

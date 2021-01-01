import { Select } from 'antd';

const { Option } = Select; // eslint-disable-line no-shadow

export default function DictionaryView({ filter: { id, label, value, options = [] }, setFilterValue }) {
  return (
    <Select
      onChange={(newValue) => setFilterValue(id, newValue)}
      value={value}
      title={`Filter by ${label}`}
    >
      {options.map((option, index) => <Option key={index} value={option}>{option}</Option>)}
    </Select>
  );
}

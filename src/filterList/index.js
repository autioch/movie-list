import { CloseOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import './style.scss';
import TYPE_VIEWS from './types';
import { getLabel } from './utils';

const { Title } = Typography;

export default function FilterList({ schema, setFilterValue, setSort, sortOrders, items, filterValues }) {
  return (
    <div className="filter-list">
      <Title level={3}>Apply filters</Title>
      {(schema.filters || []).map((filter) => {
        const { key, type } = filter;
        const View = TYPE_VIEWS[type];
        const value = filterValues[key];
        const label = getLabel(key);

        return (
          <section className="filter" key={key}>
            <div className="filter-header" onClick={() => setSort(key)} title={`Sort by ${label}`}>
              <Title level={4}>{label}</Title>
              <span className={`filter-sort-icon is-sort-${sortOrders[key]}`}></span>
            </div>
            <div className="filter-content">
              <View filterId={key} label={label} value={value} setFilterValue={setFilterValue} items={items}/>
              {value === undefined ? '' : <Button
                type="primary"
                icon={<CloseOutlined />}
                title={`Reset ${label} filter`}
                onClick={() => setFilterValue(key, undefined)}
              />}
            </div>
          </section>
        );
      })}
    </div>
  );
}

import { CloseOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import './style.scss';
import TYPE_VIEWS from './types';
import { getLabel } from './utils';

const { Title } = Typography;

export default function FilterList({ filters, resetFilter, setFilterValue, setSort, sortOrders, items, filterValues }) {
  return (
    <div className="filter-list">
      <Title level={3}>Apply filters</Title>
      {filters.map((filter) => {
        const { id, type } = filter;
        const View = TYPE_VIEWS[type];
        const value = filterValues[id];
        const label = getLabel(id);

        return (
          <section className="filter" key={id}>
            <div className="filter-header" onClick={() => setSort(id)} title={`Sort by ${label}`}>
              <Title level={4}>{label}</Title>
              <span className={`filter-sort-icon is-sort-${sortOrders[id]}`}></span>
            </div>
            <div className="filter-content">
              <View filterId={id} label={label} value={value} setFilterValue={setFilterValue} items={items}/>
              {value === undefined ? '' : <Button
                type="primary"
                icon={<CloseOutlined />}
                title={`Reset ${label} filter`}
                onClick={() => resetFilter(id)}
              />}
            </div>
          </section>
        );
      })}
    </div>
  );
}

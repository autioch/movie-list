import { CloseOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import './style.scss';
import TYPE_VIEWS from './types';

const { Title } = Typography;

export default function FilterList({ filters, resetFilter, setFilterValue, setSort }) {
  return (
    <div className="filter-list">
      <Title level={3}>Apply filters</Title>
      {filters.map((filter) => {
        const View = TYPE_VIEWS[filter.type];
        const { id, label, order, isApplied } = filter;

        return (
          <section className="filter" key={id}>
            <div className="filter-header" onClick={() => setSort(id)} title={`Sort by ${label}`}>
              <Title level={4}>{label}</Title>
              <span className={`filter-sort-icon is-sort-${order}`}></span>
            </div>
            <div className="filter-content">
              <View filter={filter} setFilterValue={setFilterValue} />
              {isApplied ? <Button
                type="primary"
                icon={<CloseOutlined />}
                title={`Reset ${label} filter`}
                onClick={() => resetFilter(id)}
              /> : ''}
            </div>
          </section>
        );
      })}
    </div>
  );
}

import { CloseOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import './style.scss';
import TYPE_VIEWS from './types';
import { getLabel } from '../utils';
import { useStore } from '../store';
import { actionFilterSetValue, actionFilterSetSort } from '../reducer';

const { Title } = Typography;

export default function FilterList() {
  const [state, dispatch] = useStore();
  const { schema, sortOrders, items, filterValues, hiddenFilters } = state;

  return (
    <div className="filter-list">
      {(schema.filters || [])
        .filter((filter) => !hiddenFilters[filter.key])
        .map((filter) => {
          const { key, type } = filter;
          const View = TYPE_VIEWS[type];
          const value = filterValues[key];
          const label = getLabel(key);

          return (
            <section className="filter" key={key}>
              <div className="filter-header" onClick={() => dispatch(actionFilterSetSort(key))} title={`Sort by ${label}`}>
                <Title level={4}>{label}</Title>
                <span className={`filter-sort-icon is-sort-${sortOrders[key]}`}></span>
              </div>
              <div className="filter-content">
                <View filterId={key} label={label} value={value} setFilterValue={(newValue) => dispatch(actionFilterSetValue(key, newValue))} items={items}/>
                {value === undefined ? '' : <Button
                  type="primary"
                  icon={<CloseOutlined />}
                  title={`Reset ${label} filter`}
                  onClick={() => dispatch(actionFilterSetValue(key, undefined))}
                />}
              </div>
            </section>
          );
        })}
    </div>
  );
}

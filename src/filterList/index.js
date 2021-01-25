import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TYPE_VIEWS from './types';
import { getLabel } from '../utils';
import { useStore } from '../store';
import { actionFilterSetValue, actionFilterSetSort } from '../reducer';
import './index.scss';

export default function FilterList() {
  const [state, dispatch] = useStore();
  const { schema, sortOrders, items, filterValues, hiddenFilters } = state;

  return (
    <div>
      {(schema.filters || [])
        .filter((filter) => !hiddenFilters[filter.key])
        .map((filter) => {
          const { key, type } = filter;
          const View = TYPE_VIEWS[type];
          const value = filterValues[key];
          const label = getLabel(key);

          return (
            <div key={key} className="filter-item">
              <div onClick={() => dispatch(actionFilterSetSort(key))} title={`Sort by ${label}`}>
                <div className="filter-item__header">{label}</div>
                <div className={`is-sort-${sortOrders[key]}`}></div>
              </div>
              <div className="filter-item-content">
                <View filterId={key} label={label} value={value} setFilterValue={(newValue) => dispatch(actionFilterSetValue(key, newValue))} items={items}/>
                {value === undefined ? '' : <Button
                  className="filter-item-reset"
                  type="primary"
                  icon={<CloseOutlined />}
                  title={`Reset ${label} filter`}
                  onClick={() => dispatch(actionFilterSetValue(key, undefined))}
                />}
              </div>
            </div>
          );
        })}
    </div>
  );
}

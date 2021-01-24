import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TYPE_VIEWS from './types';
import { getLabel } from '../utils';
import { useStore } from '../store';
import { actionFilterSetValue, actionFilterSetSort } from '../reducer';

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
            <div key={key}>
              <div onClick={() => dispatch(actionFilterSetSort(key))} title={`Sort by ${label}`}>
                <div>{label}</div>
                <div className={`is-sort-${sortOrders[key]}`}></div>
              </div>
              <div>
                <View filterId={key} label={label} value={value} setFilterValue={(newValue) => dispatch(actionFilterSetValue(key, newValue))} items={items}/>
                {value === undefined ? '' : <Button
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

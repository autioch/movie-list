import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TYPE_VIEWS from './types';
import { ORDER } from '../../consts';
import { getLabel } from '../../utils';
import { useStore } from '../../store';
import { actionFilterSetValue, actionFilterSetSort } from '../../reducer';
import { ReactComponent as SortAsc } from './sortAsc.svg';
import { ReactComponent as SortDesc } from './sortDesc.svg';
import './index.scss';

const ORDER_ICONS = {
  [ORDER.NONE]: undefined,
  [ORDER.DESC]: <SortAsc/>,
  [ORDER.ASC]: <SortDesc/>,
  [undefined]: undefined
};

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
            <div key={key} className="filter-item">

              <div
                className="filter-item__headline"
                onClick={() => dispatch(actionFilterSetSort(key))}
                title={`Sort by ${label}`}
              >
                {label}{ORDER_ICONS[sortOrders[key]]}
              </div>

              <div className="filter-item-content">
                <View
                  filterId={key}
                  label={label}
                  value={value}
                  setFilterValue={(newValue) => dispatch(actionFilterSetValue(key, newValue))}
                  items={items}
                />
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

import { Switch, Button } from 'antd';
import { useStore } from '../store';
import { actionFilterSetVisibility, actionFilterResetVisibility } from '../reducer';
import { getLabel } from '../utils';

const HALF = 0.5;

function Item({ dispatch, filter: { key }, hiddenFilters }) {
  return (
    <label className="settings-filter-item">
      <Switch checked={!hiddenFilters[key]} onChange={(isChecked) => dispatch(actionFilterSetVisibility(key, !isChecked))}/>
      {getLabel(key)}
    </label>
  );
}

export default function FilterConfig() {
  const [state, dispatch] = useStore();
  const { schema: { filters }, hiddenFilters } = state;
  const halfWidth = Math.ceil(filters.length * HALF);

  return (
    <div className="settings-section">
      <Button className="settings-reset" onClick={() => dispatch(actionFilterResetVisibility())}>Default filters</Button>
      <div className="settings-header">Filter visibility</div>
      <div className="settings-description">Control which filters are available.</div>
      <div className="settings-cols">
        <div>
          {filters.slice(0, halfWidth).map((filter) => <Item key={filter.key} dispatch={dispatch} filter={filter} hiddenFilters={hiddenFilters}/>)}
        </div>
        <div>
          {filters.slice(halfWidth).map((filter) => <Item key={filter.key} dispatch={dispatch} filter={filter} hiddenFilters={hiddenFilters}/>)}
        </div>
      </div>
    </div>
  );
}

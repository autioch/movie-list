import { Switch, Button } from 'antd';
import { useStore } from '../store';
import { actionFilterSetVisibility, actionFilterResetVisibility } from '../reducer';
import { getLabel } from '../utils';

function Item({ dispatch, filter: { key }, hiddenFilters }) {
  return (
    <div>
      <Switch checked={!hiddenFilters[key]} onChange={(isChecked) => dispatch(actionFilterSetVisibility(key, !isChecked))}/>
      {getLabel(key)}
    </div>
  );
}

export default function FilterConfig() {
  const [state, dispatch] = useStore();
  const { schema: { filters }, hiddenFilters } = state;

  return (
    <div className="settings-section">
      <div>Filter visibility</div>
      <div>Control which filters are available.</div>
      <Button onClick={() => dispatch(actionFilterResetVisibility())}>Reset all filters</Button>
      <div>
        {filters.map((filter) => <Item key={filter.key} dispatch={dispatch} filter={filter} hiddenFilters={hiddenFilters}/>)}
      </div>
    </div>
  );
}

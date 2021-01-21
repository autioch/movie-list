import { Typography, Switch, Button } from 'antd';
import KeyLabel from '../components/keyLabel';
import { useStore } from '../store';
import { actionFilterSetVisibility, actionFilterResetVisibility } from '../reducer';
import './index.scss';

const { Title } = Typography;
const HALF = 0.5;

function Item({ dispatch, filter: { key }, hiddenFilters }) {
  return (
    <div className="filter-config-item">
      <Switch checked={!hiddenFilters[key]} onChange={(isChecked) => dispatch(actionFilterSetVisibility(key, !isChecked))}/>
      <KeyLabel text={key}/>
    </div>
  );
}

export default function FilterConfig() {
  const [state, dispatch] = useStore();
  const { schema: { filters }, hiddenFilters } = state;
  const halfWidth = Math.ceil(filters.length * HALF);

  return (
    <div className="settings-section">
      <Button onClick={() => dispatch(actionFilterResetVisibility())}>Reset all filters</Button>
      <Title level={4}>Filter visibility</Title>
      <p>Control which filters are available.</p>
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

import { Typography, Switch } from 'antd';
import KeyLabel from '../components/keyLabel';
import { useStore } from '../store';
import { actionFilterSetVisibility } from '../reducer';
import './index.scss';

const { Title } = Typography;
const HALF = 0.5;

function Item({ dispatch, filter: { key, hidden } }) {
  return (
    <div className="filter-config-item">
      <Switch checked={!hidden} onChange={(isChecked) => dispatch(actionFilterSetVisibility(key, !isChecked))}/>
      <KeyLabel text={key}/>
    </div>
  );
}

export default function FilterConfig() {
  const [state, dispatch] = useStore();
  const { schema: { filters } } = state;
  const halfWidth = Math.ceil(filters.length * HALF);

  return (
    <div>
      <Title level={4}>Filter visibility</Title>
      <div className="settings-cols">
        <div>
          {filters.slice(0, halfWidth).map((filter) => <Item key={filter.key} dispatch={dispatch} filter={filter}/>)}
        </div>
        <div>
          {filters.slice(halfWidth).map((filter) => <Item key={filter.key} dispatch={dispatch} filter={filter}/>)}
        </div>
      </div>
    </div>
  );
}

import { NavLink } from 'react-router-dom';
import { FilterList } from '../menu/icons';
import { useStore } from '../store';
import { Badge } from 'antd';

export default function Empty() {
  const [state] = useStore();
  const { filterCount, schema: { labels } } = state;

  return (
    <div>
      <NavLink to="/filterList" activeClassName="selected">
        <div>
        No {labels.items} match filters.
        </div>
        <div>
        Refine filters.
        </div>
        <div>
          <Badge count={filterCount} >
            <div>
              <FilterList />
            </div>
          </Badge>
        </div>
      </NavLink>
    </div>
  );
}

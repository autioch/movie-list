import { NavLink } from 'react-router-dom';
import './index.scss';
import { FilterList } from '../menu/icons';
import { useStore } from '../store';
import { Badge } from 'antd';

export default function Empty() {
  const [state] = useStore();
  const { filterCount, schema: { labels } } = state;

  return (
    <div className="app-empty">
      <NavLink to="/filterList" activeClassName="selected">
        <div className="app-empty__message">
        No {labels.items} match filters.
        </div>
        <div className="app-empty__message">
        Refine filters.
        </div>
        <div className="app-empty__link">
          <Badge count={filterCount} >
            <div className="app-menu-button">
              <FilterList />
            </div>
          </Badge>
        </div>
      </NavLink>
    </div>
  );
}

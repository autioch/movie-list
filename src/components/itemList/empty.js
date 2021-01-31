/* eslint-disable no-magic-numbers */
import { NavLink } from 'react-router-dom';
import { FilterList4 } from '../menu/icons';
import { ROUTES } from '../../consts';
import { useStore } from '../../store';
import { Badge } from 'antd';

export default function Empty() {
  const [state] = useStore();
  const { filterCount, schema: { labels } } = state;

  return (
    <div className="item-list-empty">
      <NavLink to={ROUTES.FILTER_LIST} activeClassName="selected">
        <div>No {labels.items} match filters.</div>
        <div>Refine filters.</div>
        <Badge count={filterCount} offset={[0, 20]}>
          <FilterList4 />
        </Badge>
      </NavLink>
    </div>
  );
}

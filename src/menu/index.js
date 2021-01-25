/* eslint-disable no-magic-numbers */
import { NavLink, useLocation } from 'react-router-dom';
import { Badge } from 'antd';

import { About, FilterList4, Home, Settings3, Share, StatList } from './icons';

/* FilterList, Share2, */
import copyToClipboard from './copyToClipboard';
import { useStore } from '../store';
import { ROUTES } from '../consts';
import './index.scss';

function toggleRoute(pathname, suggestedRoute) {
  return pathname === suggestedRoute ? ROUTES.ITEM_LIST : suggestedRoute;
}

export default function Menu() {
  const [state] = useStore();
  const { filterCount } = state;
  const { pathname } = useLocation();

  return (
    <div className="menu">

      <NavLink className="menu-item" to={ROUTES.ITEM_LIST} activeClassName="selected" exact>
        <Home />
      </NavLink>

      <NavLink className="menu-item" to={toggleRoute(pathname, ROUTES.FILTER_LIST)} activeClassName="selected">
        <Badge count={filterCount} offset={[0, 20]}>
          <FilterList4 />
        </Badge>
      </NavLink>

      <NavLink className="menu-item" to={toggleRoute(pathname, ROUTES.STAT_LIST)} activeClassName="selected">
        <StatList />
      </NavLink>

      <NavLink className="menu-item" to={toggleRoute(pathname, ROUTES.SETTINGS)} activeClassName="selected">
        <Settings3 />
      </NavLink>

      <NavLink className="menu-item" to={toggleRoute(pathname, ROUTES.ABOUT)} activeClassName="selected">
        <About />
      </NavLink>

      <div className="menu-item" onClick={copyToClipboard}>
        <Share />
      </div>

    </div>
  );
}

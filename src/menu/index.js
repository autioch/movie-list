import { NavLink, useLocation } from 'react-router-dom';
import { About, FilterList4, Home, Settings3, Share, StatList } from './icons';

/* FilterList, Share2, */
import copyToClipboard from './copyToClipboard';
import { useStore } from '../store';
import { Badge } from 'antd';
import { ROUTES } from '../consts';

function toggleRoute(pathname, suggestedRoute) {
  return pathname === suggestedRoute ? ROUTES.ITEM_LIST : suggestedRoute;
}

export default function Menu() {
  const [state] = useStore();
  const { filterCount } = state;
  const { pathname } = useLocation();

  return (
    <div>

      <NavLink to={ROUTES.ITEM_LIST} activeClassName="selected" exact>
        <Home />
      </NavLink>

      <NavLink to={toggleRoute(pathname, ROUTES.FILTER_LIST)} activeClassName="selected">
        <Badge count={filterCount} >
          <FilterList4 />
        </Badge>
      </NavLink>

      <NavLink to={toggleRoute(pathname, ROUTES.STAT_LIST)} activeClassName="selected">
        <StatList />
      </NavLink>

      <NavLink to={toggleRoute(pathname, ROUTES.SETTINGS)} activeClassName="selected">
        <Settings3 />
      </NavLink>

      <NavLink to={toggleRoute(pathname, ROUTES.ABOUT)} activeClassName="selected">
        <About />
      </NavLink>

      <div onClick={copyToClipboard}>
        <Share />
      </div>

    </div>
  );
}

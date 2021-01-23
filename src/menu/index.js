import { NavLink, useLocation } from 'react-router-dom';
import './index.scss';
import { AboutIcon, FilterListIcon, HomeIcon, ShareIcon, StatListIcon, SettingsIcon } from './icons';
import copyToClipboard from './copyToClipboard';
import { useStore } from '../store';
import { Badge } from 'antd';
import { ROUTES } from '../consts';

function toggleRoute(pathname, suggestedRoute) {
  return pathname === suggestedRoute ? ROUTES.ITEM_LIST : suggestedRoute;
}

// {count} item{count === 1 ? '' : 's'}
export default function Menu() {
  const [state] = useStore();
  const {
    // items,
    filterCount
  } = state;
  const { pathname } = useLocation();

  // const count = items.length;

  return (
    <div className="app-box app-menu">

      <NavLink className="app-menu-button" to={ROUTES.ITEM_LIST} activeClassName="selected" exact>
        <HomeIcon />
      </NavLink>

      <NavLink className="app-menu-button" to={toggleRoute(pathname, ROUTES.FILTER_LIST)} activeClassName="selected">
        <Badge count={filterCount} >
          <FilterListIcon />
        </Badge>
      </NavLink>

      <NavLink className="app-menu-button" to={toggleRoute(pathname, ROUTES.SETTINGS)} activeClassName="selected">
        <SettingsIcon />
      </NavLink>

      <NavLink className="app-menu-button" to={toggleRoute(pathname, ROUTES.STAT_LIST)} activeClassName="selected">
        <StatListIcon />
      </NavLink>

      <NavLink className="app-menu-button" to={toggleRoute(pathname, ROUTES.ABOUT)} activeClassName="selected">
        <AboutIcon />
      </NavLink>

      <div className="app-menu-button" onClick={() => copyToClipboard(document.location.href)}>
        <ShareIcon />
      </div>

    </div>
  );
}

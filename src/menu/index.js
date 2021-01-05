import { NavLink, useLocation } from 'react-router-dom';
import classname from 'classname';
import './index.scss';
import { AboutIcon, FilterListIcon, ShareIcon, StatListIcon, SettingsIcon } from './icons';
import copyToClipboard from './copyToClipboard';

function toggleRoute(pathname, suggestedRoute) {
  return pathname === suggestedRoute ? '/' : suggestedRoute;
}

export default function Menu({ items, filterValues }) {
  const { pathname } = useLocation();
  const count = items.length;
  const filterCount = Object.values(filterValues).filter((value) => value !== undefined).length;

  return (
    <div className="app-menu">

      <NavLink to="/" className="app-menu-header" activeClassName="selected" exact>
        {count} Movie{count === 1 ? '' : 's'}
      </NavLink>

      <NavLink to={toggleRoute(pathname, '/filterList')} activeClassName="selected">
        <div className="app-menu-button">
          <FilterListIcon />
          {filterCount > 0 ? <div className="app-menu-counter">{filterCount}</div> : ''}
        </div>
      </NavLink>

      <NavLink to={toggleRoute(pathname, '/settings')} activeClassName="selected">
        <div className="app-menu-button">
          <SettingsIcon />
        </div>
      </NavLink>

      <NavLink to={toggleRoute(pathname, '/statList')} activeClassName="selected">
        <div className="app-menu-button">
          <StatListIcon />
        </div>
      </NavLink>

      <NavLink to={toggleRoute(pathname, '/about')} activeClassName="selected">
        <div className="app-menu-button">
          <AboutIcon />
        </div>
      </NavLink>

      <div onClick={() => copyToClipboard(document.location.href)} className={classname({
        'app-menu-button': true
      })}>
        <ShareIcon />
      </div>

    </div>
  );
}

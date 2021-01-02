import { NavLink, useLocation } from 'react-router-dom';
import classname from 'classname';
import './index.scss';
import { AboutIcon, FilterListIcon, ShareIcon, StatListIcon } from './icons';
import copyToClipboard from './copyToClipboard';

function toggleRoute(pathname, suggestedRoute) {
  return pathname === suggestedRoute ? '/' : suggestedRoute;
}

export default function Menu({ count, filtersVisible, filtersApplied, statsVisible }) {
  const { pathname } = useLocation();

  return (
    <div className="app-menu">

      <NavLink to={toggleRoute(pathname, '/filterList')} activeClassName="selected">
        <div className={classname({
          'app-menu-button': true,
          'is-active': filtersVisible,
          'is-applied': filtersApplied
        })}>
          <FilterListIcon />
        </div>
      </NavLink>

      <NavLink to={toggleRoute(pathname, '/statList')} activeClassName="selected">
        <div className={classname({
          'app-menu-button': true,
          'is-active': statsVisible
        })}>
          <StatListIcon />
        </div>
      </NavLink>

      <NavLink to="/" className="app-menu-header" activeClassName="selected" exact>
        {count} Movie{count === 1 ? '' : 's'}
      </NavLink>

      <NavLink to={toggleRoute(pathname, '/about')} activeClassName="selected">
        <div className={classname({
          'app-menu-button': true
        })}>
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

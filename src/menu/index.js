import classname from 'classname';
import './index.scss';

export default function Menu({ toggleFilters, filtersVisible, filtersApplied, toggleStats, statsVisible }) {
  return (
    <div className="app-menu">
      <div onClick={toggleFilters} className={classname({
        'app-menu-button': true,
        'is-active': filtersVisible,
        'is-applied': filtersApplied
      })}>
      F
      </div>
      <div className="app-menu-header">Movies</div>
      <div onClick={toggleStats} className={classname({
        'app-menu-button': true,
        'is-active': statsVisible
      })}>
            S
      </div>
    </div>
  );
}

import { FilterOutlined, QuestionOutlined, BarChartOutlined, ShareAltOutlined } from '@ant-design/icons';

import classname from 'classname';
import './index.scss';

// TODO Use routes
export default function Menu({ toggleFilters, filtersVisible, filtersApplied, toggleStats, statsVisible }) {
  return (
    <div className="app-menu">
      <div onClick={toggleFilters} className={classname({
        'app-menu-button': true,
        'is-active': filtersVisible,
        'is-applied': filtersApplied
      })}>
        <FilterOutlined />
      </div>
      <div className="app-menu-header">Movies</div>

      <div className={classname({
        'app-menu-button': true
      })}>
        <QuestionOutlined />
      </div>
      <div className={classname({
        'app-menu-button': true
      })}>
        <ShareAltOutlined />
      </div>
      <div onClick={toggleStats} className={classname({
        'app-menu-button': true,
        'is-active': statsVisible
      })}>
        <BarChartOutlined />
      </div>
    </div>
  );
}

import { useLocation } from 'react-router-dom';
import { useStore } from '../store';
import { actionStatisticsWithFilters } from '../reducer';
import { Switch } from 'antd';
import { ROUTES } from '../consts';
import './index.scss';

function suffix(count, labels) {
  return count === 1 ? labels.item : labels.items;
}

function getHeaderText(state, dispatch, pathname) {
  const { items, applyFiltersToStatistics, filterCount, schema: { labels } } = state;
  const count = items.length;

  switch (pathname) {
    case ROUTES.ABOUT:
      return (
        <div className="app-headline">
          <span className="app-headline__header">FAQ</span>
        </div>
      );

    case ROUTES.ITEM_LIST:
      return (
        <div className="app-headline">
          <span className="app-headline__header">{count} {suffix(count, labels)}</span>
        </div>
      );

    case ROUTES.FILTER_LIST:
      return (
        <div className="app-headline">
          <span className="app-headline__header">Apply filters</span>
          <span className="app-headline__description">{count} {suffix(count, labels)} matched</span>
        </div>
      );

    case ROUTES.STAT_LIST:
      return (
        <div className="app-headline">
          <span className="app-headline__header">Statistics</span>
          <span className="app-headline__description">
            <label className={filterCount ? '' : 'is-disabled'}>
              <Switch disabled={!filterCount} checked={applyFiltersToStatistics} onChange={(isChecked) => dispatch(actionStatisticsWithFilters(isChecked))}/>
              Apply filters
            </label>
          </span>
        </div>
      );

    case ROUTES.SETTINGS:
      return (
        <div className="app-headline">
          <span className="app-headline__header">Settings</span>
          <span className="app-headline__description">Changes will be saved on this device.</span>
        </div>
      );

    default: return labels.items;
  }
}

export default function Header() {
  const [state, dispatch] = useStore();
  const { pathname } = useLocation();

  return getHeaderText(state, dispatch, pathname);
}

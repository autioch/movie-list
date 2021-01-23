import ItemDetails from './itemDetails';
import FilterConfig from './filterConfig';
import './index.scss';

export default function StatList() {
  return (
    <div className="settings">
      <ItemDetails />
      <FilterConfig />
    </div>
  );
}

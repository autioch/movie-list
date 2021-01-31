import ItemDetails from './itemDetails';
import FilterConfig from './filterConfig';
import ThemeConfig from './themeConfig';
import './index.scss';

export default function StatList() {
  return (
    <div className="settings">
      <ThemeConfig />
      <ItemDetails />
      <FilterConfig />
    </div>
  );
}

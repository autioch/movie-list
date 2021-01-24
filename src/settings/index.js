import ItemDetails from './itemDetails';
import FilterConfig from './filterConfig';
import { ReactComponent as CautionIcon } from './caution.svg';
import './index.scss';

export default function StatList() {
  return (
    <div className="settings">
      <div className="infobox">
        <CautionIcon/>
        <span>All settings are saved separately for each device.</span>
      </div>
      <ItemDetails />
      <FilterConfig />
    </div>
  );
}

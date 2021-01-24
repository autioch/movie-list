import ItemDetails from './itemDetails';
import FilterConfig from './filterConfig';
import { ReactComponent as CautionIcon } from './caution.svg';

export default function StatList() {
  return (
    <div>
      <div>
        <CautionIcon/>
        <div>All settings are saved separately for each device.</div>
      </div>
      <ItemDetails />
      <FilterConfig />
    </div>
  );
}

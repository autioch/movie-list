import { Checkbox, Button } from 'antd';
import { useStore } from '../store';
import { actionFieldToggleVisibility, actionFieldSetVisibility, actionFieldResetVisibility } from '../reducer';
import { getLabel } from '../utils';

function Section({ label, fields = [], hiddenFields, dispatch }) {
  const checkedCount = fields.filter(({ key }) => !hiddenFields[key]).length;
  const isChecked = checkedCount === fields.length;
  const isIndeterminate = checkedCount > 0 && !isChecked;

  return (
    <div>
      <Checkbox
        checked={isChecked}
        indeterminate={isIndeterminate}
        onChange={() => dispatch(actionFieldSetVisibility(fields.map(({ key }) => key), !!isChecked))}
      >
        {getLabel(label)}
      </Checkbox>
      <div>
        {fields.map(({ key }) =>
          <Checkbox key={key} checked={!hiddenFields[key]} onChange={() => dispatch(actionFieldToggleVisibility(key))}>
            {getLabel(key)}
          </Checkbox>
        )}
      </div>
    </div>
  );
}

export default function ItemDetails() {
  const [state, dispatch] = useStore();
  const { schema, hiddenFields } = state;

  return (
    <div>
      <Button onClick={() => dispatch(actionFieldResetVisibility())}>Reset all details</Button>
      <div>{schema.labels.item} details</div>
      <div>Control which details are visible for each {schema.labels.item}.</div>
      <div>
        <div>
          <Section label="Header" fields={schema.header} hiddenFields={hiddenFields} dispatch={dispatch}/>
          <Section label="Content" fields={schema.content} hiddenFields={hiddenFields} dispatch={dispatch} />
          <Section label="Footnotes" fields={schema.footnotes} hiddenFields={hiddenFields} dispatch={dispatch} />
        </div>
        <div>
          <Section label="Links" fields={schema.links} hiddenFields={hiddenFields} dispatch={dispatch}/>
          <Section label="Sidenotes" fields={schema.sidenotes} hiddenFields={hiddenFields} dispatch={dispatch}/>
        </div>
      </div>
    </div>
  );
}

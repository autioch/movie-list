import './index.scss';
import { Typography, Checkbox } from 'antd';
import { getLabel } from '../utils';

const { Title } = Typography;

function Section({ label, fields = [], hiddenFields, toggleFieldVisibility }) {
  return (
    <section className="settings-section">
      <Title level={5}>{getLabel(label)}</Title>
      <ul>
        {fields.map(({ key }) =>
          <Checkbox className="settings-item" key={key} checked={!hiddenFields[key]} onChange={() => toggleFieldVisibility(key)}>
            {getLabel(key)}
          </Checkbox>
        )}
      </ul>
    </section>
  );
}

export default function StatList({ schema, hiddenFields, toggleFieldVisibility }) {
  return (
    <div className="settings">
      <Title level={3}>Settings</Title>
      <Title level={4}>Visibility</Title>
      <div className="cols">
        <div className="col-left">
          <Section label="Header" fields={schema.header} hiddenFields={hiddenFields} toggleFieldVisibility={toggleFieldVisibility}/>
          <Section label="Content" fields={schema.content} hiddenFields={hiddenFields} toggleFieldVisibility={toggleFieldVisibility} />
          <Section label="Footnotes" fields={schema.footnotes} hiddenFields={hiddenFields} toggleFieldVisibility={toggleFieldVisibility} />
        </div>
        <div className="col-right">
          <Section label="Links" fields={schema.links} hiddenFields={hiddenFields} toggleFieldVisibility={toggleFieldVisibility} />
          <Section label="Sidenotes" fields={schema.sidenotes} hiddenFields={hiddenFields} toggleFieldVisibility={toggleFieldVisibility} />
        </div>
      </div>
    </div>
  );
}

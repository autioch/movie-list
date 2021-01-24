function Header({ def, item }) {
  return (<h3>{item[def.key]}</h3>);
}

function Content({ def, item }) {
  return (<div>{item[def.key]}</div>);
}

function Footnotes({ def, item }) {
  return (
    <div>
      <header>{def.label}</header>
      <div>
        {item[def.key].map((detail, index) => <div key={index}>{detail}</div>)}
      </div>
    </div>
  );
}

function Link({ item, def }) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      title={`Search in ${def.label}`}
      href={def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key])}
    >
      <img src={`/data/${def.key}.png`} alt={`${def.key}`}/>
    </a>
  );
}

function Sidenotes({ def, item }) {
  const content = def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key]);
  const rankClassName = def.ranked ? `t-rank__text--${item[`${def.key}Level`]}` : '';

  return <div className={rankClassName}>{content}</div>;
}

function SchemaItem({ schema = [], item, View, hiddenFields }) {
  return schema
    .filter((def) => {
      if (hiddenFields[def.key]) {
        return false;
      }
      const value = item[def.key];

      return value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length);
    })
    .map((def, index) => <View key={index} def={def} item={item} />);
}

export default function Item({ item, schema, style, hiddenFields }) {
  return (
    <div style={style}>
      <div>
        <div>
          <SchemaItem item={item} hiddenFields={hiddenFields} schema={schema.header} View={Header} />
        </div>
        <div>
          {schema.links.filter((def) => !hiddenFields[def.key]).map((def, index) => <Link key={index} item={item} def={def} />)}
        </div>
      </div>
      <div>
        <div>
          <SchemaItem item={item} hiddenFields={hiddenFields} schema={schema.content} View={Content}/>
          <SchemaItem item={item} hiddenFields={hiddenFields} schema={schema.footnotes} View={Footnotes} />
        </div>
        <div>
          <SchemaItem item={item} hiddenFields={hiddenFields} schema={schema.sidenotes} View={Sidenotes} />
        </div>
      </div>
    </div>
  );
}

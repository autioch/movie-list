function Header({ def, item }) {
  return (<div>{item[def.key]}</div>);
}

function Content({ def, item }) {
  return (<div>{item[def.key]}</div>);
}

function Footnotes({ def, item }) {
  return (
    <div className="item-footnotes">
      <div className="item-footnotes__header">{def.label}</div>
      <div className="item-footnotes__list">
        {item[def.key].map((detail, index) => <span className="item-footnotes__item" key={index}>{detail}</span>)}
      </div>
    </div>
  );
}

function Link({ item, def }) {
  return (
    <a
      className="item-link"
      target="_blank"
      rel="noreferrer"
      title={`Search in ${def.label}`}
      href={def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key])}
    >
      <img className="item-link__image" src={`/data/${def.key}.png`} alt={`${def.key}`}/>
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
    <div className="item" style={style}>
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

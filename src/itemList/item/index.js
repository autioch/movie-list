import './index.scss';

function Header({ def, item }) {
  return (<h3>{item[def.key]}</h3>);
}

function Content({ def, item }) {
  return (<p>{item[def.key]}</p>);
}

function Footnotes({ def, item }) {
  return (
    <section className="item-footnotes">
      <header className="item-footnotes__header">{def.label}</header>
      <ul className="item-footnotes__list">
        {item[def.key].map((detail, index) => <li className="item-footnotes__item" key={index}>{detail}</li>)}
      </ul>
    </section>
  );
}

function Link({ item, def }) {
  return (
    <a
      className="item__link"
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

  return <li className={rankClassName}>{content}</li>;
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
      <div className="item__headline">
        <div className="item__header">
          <SchemaItem item={item} hiddenFields={hiddenFields} schema={schema.header} View={Header} />
        </div>
        <div className="item__links">
          {schema.links.filter((def) => !hiddenFields[def.key]).map((def, index) => <Link key={index} item={item} def={def} />)}
        </div>
      </div>
      <div className="item__body">
        <div className="item__content">
          <SchemaItem item={item} hiddenFields={hiddenFields} schema={schema.content} View={Content}/>
          <SchemaItem item={item} hiddenFields={hiddenFields} schema={schema.footnotes} View={Footnotes} />
        </div>
        <ul className="item__sidenotes">
          <SchemaItem item={item} hiddenFields={hiddenFields} schema={schema.sidenotes} View={Sidenotes} />
        </ul>
      </div>
    </div>
  );
}

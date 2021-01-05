import './style/index.scss';

// function SingleItem({ val, template, item, rankClassName }) {
//   const content = template ? template.replace(/#\{([^}]+)\}/g, (match, key) => item[key]) : val;
//
//   return <p className={rankClassName}>{content}</p>;
// }
/* , template*/
function Section({ def: { key, label, ranked }, item }) {
  const val = item[key];
  const list = Array.isArray(val);
  const rankClassName = ranked ? ` t-rank__text--${item[`${key}Level`]}` : 'pass';

  if (label && list) {
    <section>
      <header>{label}</header>
      <ul
        className={rankClassName}>{val.map((warning, index) => <li key={index}>{warning}</li>)}
      </ul>
    </section>;
  }

  if (label && !list) {
    return (
      <section>
        <header>{label}</header>
        <div className={rankClassName}>{val}</div>
      </section>
    );
  }
  if (!label && list) {
    return (
      <ul
        className={rankClassName}>{val.map((warning, index) => <li key={index}>{warning}</li>)}
      </ul>
    );
  }

  return (
    <p className={rankClassName}>{val}</p>
  );
}

// function Sidenotes({ def, item }) {
//   const content = def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key]);
//   const rankClassName = def.ranked ? ` t-rank__text--${item[`${def.key}Level`]}` : '';
//
//   return <li className={`item-sidenotes__list-item${rankClassName}`}>{content}</li>;
// }

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

function SchemaItem({ schema = [], item }) {
  return schema
    .filter((def) => {
      if (def.hidden) {
        return false;
      }
      const value = item[def.key];

      return value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length);
    })
    .map((def, index) => <Section key={index} def={def} item={item} />);
}

export default function Item({ item, schema, style }) {
  return (
    <div className="item-container" style={style}>
      <div className="header">
        <SchemaItem schema={schema.header} item={item} />
      </div>
      <div className="warning">
        <SchemaItem schema={schema.warning} item={item} />
      </div>
      <div className="links">
        {schema.links.filter((def) => !def.hidden).map((def, index) => <Link key={index} item={item} def={def} />)}
      </div>
      <div className="content">
        <SchemaItem schema={schema.content} item={item} />
      </div>
      <div className="sidenotes">
        <SchemaItem schema={schema.sidenotes} item={item} />
      </div>
      <div className="footnotes">
        <SchemaItem schema={schema.footnotes} item={item} />
      </div>
    </div>
  );
}

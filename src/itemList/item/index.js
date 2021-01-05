import './style/index.scss';

function Header({ def, item }) {
  return (<span>{item[def.key]}</span>);
}

function Warnings({ item, def }) {
  return (
    <span>
      <span>?</span>
      <ul>
        {item[def.key].map((warning, index) => <li key={index}>{warning}</li>)}
      </ul>
    </span>
  );
}

function Content({ def, item }) {
  return (<p>{item[def.key]}</p>);
}

function Footnotes({ def, item }) {
  return (
    <section>
      <header>{def.label}</header>
      <ul>
        {item[def.key].map((detail, index) => <li key={index}>{detail}</li>)}
      </ul>
    </section>
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
  const rankClassName = def.ranked ? ` t-rank__text--${item[`${def.key}Level`]}` : '';

  return <li className={rankClassName}>{content}</li>;
}

function SchemaItem({ schema = [], item, View }) {
  return schema
    .filter((def) => {
      if (def.hidden) {
        return false;
      }
      const value = item[def.key];

      return value !== null && value !== undefined && value !== '' && (!Array.isArray(value) || value.length);
    })
    .map((def, index) => <View key={index} def={def} item={item} />);
}

export default function Item({ item, schema, style }) {
  return (
    <div style={style}>
      <header>
        <SchemaItem schema={schema.header} item={item} View={Header} />
        <SchemaItem schema={schema.warning} item={item} View={Warnings} />
        {schema.links.filter((def) => !def.hidden)
          .map((def, index) => <Link key={index} item={item} def={def} />)}
      </header>
      <section>
        <article>
          <SchemaItem schema={schema.content} item={item} View={Content} />
        </article>
        <aside>
          <ul>
            <SchemaItem schema={schema.sidenotes} item={item} View={Sidenotes} />
          </ul>
        </aside>
      </section>
      <SchemaItem schema={schema.footnotes} item={item} View={Footnotes} />
    </div>
  );
}

import './style/index.scss';

function Header({ def, item }) {
  return (<span className="item__title t-header">{item[def.key]}</span>);
}

function Warnings({ item, def }) {
  return (
    <span className="item-warning">
      <span className="item-warning__icon t-warn">?</span>
      <ul className="item-warning__list t-box">
        <li>Info might be incorrect. Reasons:</li>
        {item[def.key].map((warning, index) => <li key={index} className="item-warning__item">{warning}</li>)}
      </ul>
    </span>
  );
}

function Content({ def, item }) {
  return (<p className="item__content">{item[def.key]}</p>);
}

function Details({ def, item }) {
  return (
    <section className="item-detail t-hint">
      <header className="item-detail__header">{def.label}</header>
      <ul className="item-detail__list">
        {item[def.key].map((detail, index) => <li key={index} className="item-detail__list-item">{detail}</li>)}
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

function Summary({ def, item }) {
  const content = def.template.replace(/#\{([^}]+)\}/g, (match, key) => item[key]);
  const rankClassName = def.ranked ? ` t-rank__text--${item[`${def.key}Level`]}` : '';

  return <li className={`item-summary__list-item${rankClassName}`}>{content}</li>;
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

export default function Item({ item, schema }) {
  return (
    <section className="item t-box">
      <article className="item__description">
        <header className="item__header">
          <SchemaItem schema={schema.header} item={item} View={Header} />
          <SchemaItem schema={schema.warning} item={item} View={Warnings} />
        </header>
        <SchemaItem schema={schema.content} item={item} View={Content} />
        <SchemaItem schema={schema.details} item={item} View={Details} />
      </article>
      <aside className="item-summary">
        <ul className="item-summary__list">
          <li className="item-summary__list-item">
            {schema.links.filter((def) => !def.hidden).map((def, index) => <Link key={index} item={item} def={def} />)}
          </li>
          <SchemaItem schema={schema.summary} item={item} View={Summary} />
        </ul>
      </aside>
    </section>
  );
}

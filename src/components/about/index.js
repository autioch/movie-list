import { useStore } from '../../store';
import { RANK_LEVELS } from '../../consts';
import './index.scss';

export default function About() {
  const [state] = useStore();
  const { schema: { labels } } = state;

  return (
    <div className="about">
      <div className="about-header">App</div>
      <p>{labels.description}</p>
      <div className="about-header">Filtering</div>
      <p>Clicking on the filter title will sort {labels.items} by that property.</p>
      <p>Each applied filter will narrow down possible options of filters,
       including its own - this is especially useful when give {labels.item} property has multiple values.</p>
      <div className="about-header">Ranking legend</div>
      <p>Statistics displayed on the right of each {labels.item} are colorized based
      on their value.</p>
      <div className="about-rank-list">
        {RANK_LEVELS.map((level, index) => <div className="about-rank-item" key={index}></div>)}
      </div>
      <div className="about-header">Technical details</div>
      <p>Screen resolution: {window.innerWidth}x{window.innerHeight}</p>
    </div>
  );
}

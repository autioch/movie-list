import { useStore } from '../store';
import { RANK_LEVELS } from '../consts';

export default function About() {
  const [state] = useStore();
  const { schema: { labels } } = state;

  return (
    <div>
      <div>App</div>
      <div>{labels.description}</div>
      <div>Filtering</div>
      <div>Clicking on the filter title will sort {labels.items} by that property.</div>
      <div>Each applied filter will narrow down possible options of filters,
       including its own - this is especially useful when give {labels.item} property has multiple values.</div>
      <div>Ranking legend</div>
      <div>Statistics displayed on the right of each {labels.item} are colorized based
      on their value.</div>
      <div>
        {RANK_LEVELS.map((level, index) => <div key={index}>{level}</div>)}
      </div>
      <div>Technical details</div>
      <div>Screen resolution: {window.innerWidth}x{window.innerHeight}</div>
    </div>
  );
}

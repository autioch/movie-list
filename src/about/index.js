import Legend from './legend';
import { Typography } from 'antd';
import { useStore } from '../store';
import './index.scss';

const { Title } = Typography;

export default function About() {
  const [state] = useStore();
  const { schema: { labels } } = state;

  return (
    <div className="about">
      <Title level={4}>App</Title>
      <p>{labels.description}</p>
      <Title level={4}>Filtering</Title>
      <p>Clicking on the filter title will sort {labels.items} by that property.</p>
      <p>Each applied filter will narrow down possible options of filters,
       including its own - this is especially useful when give {labels.item} property has multiple values.</p>
      <Title level={4}>Ranking legend</Title>
      <p>Statistics displayed on the right of each {labels.item} are colorized based
      on their value.</p>
      <Legend />
      <Title level={4}>Technical details</Title>
      <p>Screen resolution: {window.innerWidth}x{window.innerHeight}</p>
    </div>
  );
}

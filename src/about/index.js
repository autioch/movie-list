import Legend from './legend';
import { Typography } from 'antd';
import './index.scss';

const { Title } = Typography;

export default function About() {
  return (
    <div className="about">
      <Title level={3}>About</Title>
      <Title level={4}>App</Title>
      <p>List of movies that I have seen/watched. This is personal list,
      as I wasn't happy with lists provided by IMDB or other similar services.</p>
      <Title level={4}>Ranking legend</Title>
      <p>Statistics displayed on the right of each item are colorized based
      on their value.</p>
      <Legend />
      <Title level={4}>Technical details</Title>
      <p>Screen resolution: {window.innerWidth}x{window.innerHeight}</p>
    </div>
  );
}

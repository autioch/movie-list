import Legend from './legend';
import { Typography } from 'antd';
import './index.scss';

const { Title } = Typography;

export default function About() {
  return (
    <div className="about">
      <Title level={3}>About</Title>
      List of movies that I have seen/watched. This is personal list,
      as I wasn't happy with lists provided by IMDB or other similar services.
      <Title level={4}>Ranking legend</Title>
      <Legend />
    </div>
  );
}

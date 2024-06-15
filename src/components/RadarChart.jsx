import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.skill),
    datasets: [
      {
        label: 'Skill Scores',
        data: data.map(item => item.score),
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scale: {
      ticks: { beginAtZero: true, max: 10 },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default RadarChart;

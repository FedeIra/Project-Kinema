import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart({ basicUsers, premiumUsers }) {
  const userData = {
    labels: [`Basic Users: ${basicUsers}%`, `Premium Users: ${premiumUsers}%`],
    datasets: [
      {
        label: 'My First Dataset',
        data: [basicUsers, premiumUsers],
        backgroundColor: ['rgb(100, 180, 2)', 'rgb(255, 180, 86)'],
        color: 'blue',
      },
    ],
  };

  return <Doughnut data={userData} />;
}

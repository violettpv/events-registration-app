import dayjs from 'dayjs';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RegistrationChart({ participants }) {
  // get registration count for the last 7 days + today
  const getLast7DaysRegistrationData = () => {
    const today = dayjs();
    const last7Days = [];

    // an array of the last 7 days + today
    for (let i = 7; i >= 0; i--) {
      last7Days.push({
        date: today.subtract(i, 'day').format('YYYY-MM-DD'),
        registrations: 0,
      });
    }

    // count participants for each day
    participants.forEach((participant) => {
      const registrationDate = dayjs(participant.createdAt).format('YYYY-MM-DD');
      const day = last7Days.find((d) => d.date === registrationDate);
      if (day) {
        day.registrations += 1;
      }
    });

    return last7Days;
  };

  const registrationData = getLast7DaysRegistrationData();

  const chartData = {
    labels: registrationData.map((item) => item.date),
    datasets: [
      {
        label: 'Registrations',
        data: registrationData.map((item) => item.registrations),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Registrations in the last 7 days',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import LoaderPointsComponent from '../LoaderPoints.component';

interface PieData {
  category: string;
  count: number;
}

export default function PieChart1Component() {
  const [data, setData] = useState<PieData[] | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:4000/pieChartData2') // Cambiar por tu endpoint mock real
      .then((res) => setData(res.data))
      .catch(() => setData([]));
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <LoaderPointsComponent />
      </div>
    );
  }

  const series = data.map((item) => item.count);
  const labels = data.map((item) => item.category);

  const options = {
    labels,
    legend: { position: 'bottom', labels: { colors: 'white' } },
    dataLabels: { enabled: true, style: { colors: ['#444'] } },
    chart: {
      toolbar: { show: true },
    },
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
  };

  return <Chart options={options} series={series} type="pie" height={300} />;
}

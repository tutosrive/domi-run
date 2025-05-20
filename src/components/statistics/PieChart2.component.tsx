import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import LoaderPointsComponent from '../LoaderPoints.component';

interface PieData {
  category: string;
  count: number;
}

export default function PieChart2Component() {
  const [data, setData] = useState<PieData[] | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:4000/pieChartData') // Cambiar por tu endpoint mock real
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
    legend: { position: 'bottom', labels: { colors: '#fff' } },
    dataLabels: { enabled: true, style: { colors: ['#fff'] } },
    chart: {
      toolbar: { show: true },
    },
  };

  return <Chart options={options} series={series} type="pie" height={300} />;
}

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import LoaderPointsComponent from '../LoaderPoints.component';

interface BarData {
  label: string;
  value: number;
}

export default function BarChart2Component() {
  const [data, setData] = useState<BarData[] | null>(null);

  useEffect(() => {
    axios.get('http://localhost:4000/barChartData')  // Cambiar por tu endpoint mock real
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <LoaderPointsComponent />
      </div>
    );
  }

  const series = [{
    name: 'Values',
    data: data.map(item => item.value),
  }];

  const options = {
    chart: { type: 'bar', toolbar: { show: true }, foreColor: '#fff' },
    xaxis: { categories: data.map(item => item.label) },
    dataLabels: { enabled: true },
    theme: { mode: 'dark' },
  };

  return <Chart options={options} series={series} type="bar" height={300} />;
}

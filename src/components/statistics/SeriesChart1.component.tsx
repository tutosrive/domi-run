import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import axios from 'axios';

interface DataPoint {
  month: string;
  sales: number;
}

export default function SeriesChart1Component() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    // Aquí llamamos al mock server para obtener datos de series temporales
    axios.get('http://localhost:4000/userRegistrations')
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(() => {
        setData([]);
      });
  }, []);

  const options: ApexOptions = {
    chart: {
      id: 'series-chart',
      type: 'line',
      zoom: { enabled: false },
      foreColor: '#333',
    },
    xaxis: {
      categories: data.map((d) => d.month),
      title: { text: 'Month' },
    },
    yaxis: {
      title: { text: 'Sales' },
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: { enabled: false },
    title: {
      text: 'Monthly Sales Series',
      align: 'center',
    },
  };

  const series = [
    {
      name: 'Sales',
      data: data.map((d) => d.sales),
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" height={300} />
    </div>
  );
}

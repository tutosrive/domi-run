import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import axios from 'axios';

interface BarData {
  category: string;
  count: number;
}

export default function BarChart1Component() {
  const [data, setData] = useState<BarData[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/barStats')
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
      id: 'bar-chart-different',
      type: 'bar',
      toolbar: { show: true },
      foreColor: 'white',
    },
    xaxis: {
      categories: data.map((d) => d.category),
      title: { text: 'Category' },
    },
    yaxis: {
      title: { text: 'Count' },
      min: 0,
    },
    colors: ['#00BFFF', '#FF6347'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['white'],
      },
    },
    title: {
      text: 'Count per Category (Bar Chart)',
      align: 'center',
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const series = [
    {
      name: 'Count',
      data: data.map((d) => d.count),
    },
  ];

  return <Chart options={options} series={series} type="bar" height={320} />;
}

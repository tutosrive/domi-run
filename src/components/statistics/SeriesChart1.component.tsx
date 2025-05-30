import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import axios from 'axios';

interface DeliveryData {
  month: string;
  deliveries: number;
}

export default function SeriesChart1Component() {
  const [data, setData] = useState<DeliveryData[]>([]);

  useEffect(() => {
    // Podrías agregar este array en mock/db.json, o simularlo localmente
    // Por ejemplo, si quieres usar mock:
    axios
      .get('http://localhost:4000/deliveriesStats2')
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(() => {
        // fallback: datos estáticos temporales para demo
        setData([
          { month: 'January', deliveries: 200 },
          { month: 'February', deliveries: 100 },
          { month: 'March', deliveries: 110 },
          { month: 'April', deliveries: 43 },
        ]);
      });
  }, []);

  const options: ApexOptions = {
    chart: {
      id: 'series-chart-different',
      type: 'area',
      zoom: { enabled: false },
      foreColor: 'white',
    },
    colors: ['#FF6347'],
    xaxis: {
      categories: data.map((d) => d.month),
      title: { text: 'Month' },
    },
    yaxis: {
      title: { text: 'Deliveries' },
    },
    stroke: {
      curve: 'smooth',
    },
    tooltip: { theme: 'dark' },
    dataLabels: { enabled: false },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.7,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
  };

  const series = [
    {
      name: 'Deliveries',
      data: data.map((d) => d.deliveries),
    },
  ];

  return <Chart options={options} series={series} type="area" height={320} />;
}

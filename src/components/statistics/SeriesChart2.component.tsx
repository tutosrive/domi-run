import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import axios from 'axios';

interface DeliveryData {
  month: string;
  deliveries: number;
}

export default function SeriesChart2Component() {
  const [data, setData] = useState<DeliveryData[]>([]);

  useEffect(() => {
    // Podrías agregar este array en mock/db.json, o simularlo localmente
    // Por ejemplo, si quieres usar mock:
    axios
      .get('http://localhost:4000/deliveriesStats')
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch(() => {
        // fallback: datos estáticos temporales para demo
        setData([
          { month: 'January', deliveries: 90 },
          { month: 'February', deliveries: 70 },
          { month: 'March', deliveries: 110 },
          { month: 'April', deliveries: 95 },
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
    tooltip: { theme: 'dark' },
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
    title: {
      text: 'Monthly Deliveries (Area Chart)',
      align: 'center',
    },
  };

  const series = [
    {
      name: 'Deliveries',
      data: data.map((d) => d.deliveries),
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="area" height={320} />
    </div>
  );
}

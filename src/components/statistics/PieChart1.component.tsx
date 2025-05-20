import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import axios from 'axios';

interface PieData {
  label: string;
  value: number;
}

export default function PieChart1Component() {
  const [data, setData] = useState<PieData[]>([]);

  useEffect(() => {
    // Llamada al mock server para obtener datos para la gráfica de torta
    axios.get('http://localhost:4000/circularStats')
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
    labels: data.map((d) => d.label),
    legend: {
      position: 'bottom',
    },
    title: {
      text: 'Distribution by Category',
      align: 'center',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: { position: 'bottom' },
        },
      },
    ],
  };

  const series = data.map((d) => d.value);

  return (
    <div>
      <Chart options={options} series={series} type="pie" height={300} />
    </div>
  );
}

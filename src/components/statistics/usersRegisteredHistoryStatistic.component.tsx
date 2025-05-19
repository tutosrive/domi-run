import React, { useEffect, useState } from 'react';
import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import customerService from '../../services/customer.service.ts';
import LoaderPointsComponent from '../LoaderPoints.component.tsx';

// Temporary chart for user registration history
export default function UserHistoryStatisticComponent() {
  const [dataTemp, setDataGraphTemp] = useState<{ month: string; registrations: number }[] | null>(null);

  // Fetch data from backend on component mount
  const fetchData = async () => {
    const res = await customerService.get_history_customers_register();
    if (res.status === 200 && res.data) {
      if (Array.isArray(res.data)) {
        const dataArray = Array.isArray(res.data) ? res.data : [res.data];
        setDataGraphTemp(dataArray);
      }
    } else {
      setDataGraphTemp([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ApexChart options and series
  const chartOptions: ApexOptions = {
    chart: {
      redrawOnWindowResize: true,
      redrawOnParentResize: true,
      events: {
        mounted: (chart) => chart.windowResizeHandler(),
      },
      id: 'user-registration-history',
      type: 'area',
      foreColor: '#ffffff80',
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: { enabled: true, delay: 350 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
      toolbar: { show: true, offsetY: 260 },
      zoom: { enabled: true },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
      width: 7,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.6,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'MMMM',
      },
      y: {
        formatter: (val) => `${val} users`,
      },
    },
    xaxis: {
      categories: dataTemp?.map((item) => item.month) || [],
      title: { text: 'Month' },
      labels: {
        rotate: -45,
        style: { fontSize: '12px' },
      },
    },
    yaxis: {
      title: { text: 'Registrations' },
    },
    title: {
      text: 'Monthly User Registrations (Historical Trend)',
      align: 'center',
      margin: 20,
      offsetY: 0,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white',
      },
    },
  };

  const chartSeries = [
    {
      name: 'Registrations',
      data: dataTemp?.map((item) => item.registrations) || [],
    },
  ];

  return dataTemp ? (
    <Chart key={JSON.stringify(chartSeries)} options={chartOptions} series={chartSeries} type="area" height={300} />
  ) : (
    <div className="flex justify-center items-center w-full h-64">
      <LoaderPointsComponent />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import driverService from '../../services/driver.service';
import LoaderPointsComponent from '../LoaderPoints.component';

export default function DriverMonthStatisticComponent() {
  const [configCharPieSRM, setConfigCharSRM] = useState({
    series: [],
    options: {
      title: {
        text: 'Most wanted Driver by month',
        align: 'center',
        margin: 20,
        offsetY: 0,
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'white',
        },
      },
      chart: {
        type: 'pie',
        toolbar: { show: true },
        foreColor: '#ffffff',
      },
      labels: [],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#ffffff'],
        },
        background: {
          enabled: true,
          foreColor: '',
          borderWidth: 0,
        },
      },
      legend: {
        labels: { colors: 'white' },
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  const getDataDriversCounter = async () => {
    const req = await driverService.get_driver_counter();
    const series = req.data?.map((d) => d.quantity) || [];
    const labels = req.data?.map((d) => d.name) || [];
    setConfigCharSRM((prev) => ({
      series,
      options: { ...prev.options, labels },
    }));
  };

  useEffect(() => {
    getDataDriversCounter();
  }, []);

  return <div className="w-full h-full">{configCharPieSRM.series.length > 0 ? <Chart options={configCharPieSRM.options} series={configCharPieSRM.series} type="pie" width="100%" /> : <LoaderPointsComponent />}</div>;
}

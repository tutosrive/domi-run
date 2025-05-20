import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import LoaderPointsComponent from '../LoaderPoints.component';
import driverService from '../../services/driver.service';

interface DeliveryData {
  year_month: string;
  driver: string;
  deliveries: number;
}

interface ChartData {
  driver: string;
  deliveries: number;
}

export default function DriverMostWantedMonth() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await driverService.get_driver_counter();
      console.log('Chart data:', response);

      if (response.status === 200) {
        // Process data to group by driver and sum deliveries
        const aggregatedData = response.data.reduce((acc: Record<string, number>, curr: DeliveryData) => {
          acc[curr.driver] = (acc[curr.driver] || 0) + curr.deliveries;
          return acc;
        }, {});

        const formattedData = Object.entries(aggregatedData).map(([driver, deliveries]) => ({
          driver,
          deliveries,
        }));

        setChartData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-64">
        <LoaderPointsComponent />
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return <div className="flex justify-center items-center w-full h-64 text-gray-500">No data available</div>;
  }

  const chartOptions = {
    labels: chartData.map((item) => item.driver),
    legend: {
      position: 'bottom' as const,
      labels: {
        colors: 'white',
      },
    },
    chart: {
      toolbar: { show: true },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#000'],
      },
      formatter: function (val: number, opts: any) {
        return `${val.toFixed(0)}% (${opts.w.config.series[opts.seriesIndex]})`;
      },
    },
    colors: ['#845EC2', '#FFC75F', '#F9F871', '#0081CF', '#B39CD0', '#F6A6B2', '#A0E7E5', '#FFB7B2', '#B5EAD7', '#C7CEEA'],
    tooltip: {
      y: {
        formatter: (value: number) => `${value} deliveries`,
      },
    },
  };

  const chartSeries = chartData.map((item) => item.deliveries);

  return <Chart options={chartOptions} series={chartSeries} type="pie" height={350} />;
}

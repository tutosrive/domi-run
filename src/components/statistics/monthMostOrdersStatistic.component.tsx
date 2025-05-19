import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import orderService from '../../services/order.service';
import LoaderPointsComponent from '../LoaderPoints.component';

// Define the shape of the data returned by the backend
interface OrderData {
  total_orders: number;
  year_month: string;
}

const MonthMostOrdersStatisticComponent: React.FC = () => {
  // State to hold the chart data
  // const [dataBars, setDataBars] = useState<{
  //   series: { name: string; data: number[] }[];
  //   options: ApexCharts.ApexOptions;
  // } | null>(null);
  const [dataBars, setDataBars] = useState<{
    series: { name: string; data: number[] }[];
    options: ApexCharts.ApexOptions;
  } | null>(null);

  // Function to fetch data from the backend
  const fetchOrderData = async () => {
    try {
      const response = await orderService.get_order_month_most_wanted();
      const data: OrderData[] = response.data || [];
      console.log(response);

      // Extract categories and corresponding data
      const categories = data.map((item) => item.year_month);
      const seriesData = data.map((item) => item.total_orders);

      // Set the chart data
      setDataBars({
        series: [
          {
            name: 'Pedidos',
            data: seriesData,
          },
        ],
        options: {
          chart: {
            redrawOnWindowResize: true,
            redrawOnParentResize: true,
            events: {
              mounted: (chart) => chart.windowResizeHandler(),
            },

            type: 'bar',
            background: 'transparent',
            foreColor: '#fff',
            animations: {
              enabled: true,
              speed: 800,
            },
            toolbar: {
              show: true,
            },
          },
          title: {
            text: 'Meses con más pedidos',
            align: 'center',
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#ffffff',
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: '60%',
              distributed: true,
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              colors: ['#ffffff'],
            },
          },
          xaxis: {
            categories,
            labels: {
              rotate: -45,
              style: {
                fontSize: '12px',
              },
            },
            axisBorder: { color: '#555' },
          },
          yaxis: {
            title: {
              text: 'Número de pedidos',
              style: {
                color: '#ffffff',
              },
            },
            labels: {
              style: {
                color: '#ffffff',
              },
            },
          },
          colors: ['#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a'],
          tooltip: {
            theme: 'dark',
          },
          grid: {
            borderColor: '#444',
            strokeDashArray: 4,
          },
        },
      });
    } catch (error) {
      console.warn('Error fetching order data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <>
      {dataBars ? (
        <Chart key={JSON.stringify(dataBars.series)} options={dataBars.options} series={dataBars.series} type="bar" width="100%" height={350} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <LoaderPointsComponent />
        </div>
      )}
    </>
  );
};

export default MonthMostOrdersStatisticComponent;

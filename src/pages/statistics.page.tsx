import React from 'react';

import DriverMostWantedMonth from '../components/statistics/driverMonthStatistic.component';
import RowStatisticComponent from '../components/statistics/RowStatisticComponent';
import MonthMostOrdersStatisticComponent from '../components/statistics/monthMostOrdersStatistic.component';
import UserHistoryStatisticComponent from '../components/statistics/usersRegisteredHistoryStatistic.component';

// Nuevas gráficas que creamos:
import PieChart1Component from '../components/statistics/PieChart1.component';
import PieChart2Component from '../components/statistics/PieChart2.component';
import BarChart1Component from '../components/statistics/BarChart1.component';
import BarChart2Component from '../components/statistics/BarChart2.component';
import SeriesChart1Component from '../components/statistics/SeriesChart1.component';
import SeriesChart2Component from '../components/statistics/SeriesChart2.component';

export default function StatisticsPage() {
  const templateCardGraph = ({ title, component, count }: { title: string; component: React.ReactNode; count: number }) => {
    return (
      <div key={`gp-${count}-ctn`} className="w-full h-full bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
        <div key={`gp-${count}-ctn-body`}>
          <h3 key={`gp-${count}-h3`} className="mb-1 text-center font-semibold text-lg">
            {title}
          </h3>
          {component}
        </div>
      </div>
    );
  };

  // 3 gráficas originales
  const graphPieSRM = () =>
    templateCardGraph({
      title: 'Driver Monthly Statistics (Pie)',
      component: <DriverMostWantedMonth />,
      count: 1,
    });

  const graphBarsSRM = () =>
    templateCardGraph({
      title: 'Most Orders per Month (Bar)',
      component: <MonthMostOrdersStatisticComponent />,
      count: 2,
    });

  const graphTemporarySRM = () =>
    templateCardGraph({
      title: 'Monthly User Registrations (Historical Trend)',
      component: <UserHistoryStatisticComponent />,
      count: 3,
    });

  // 6 nuevas gráficas
  const graphPie1 = () =>
    templateCardGraph({
      title: 'Pie Chart 1 - Categories',
      component: <PieChart1Component />,
      count: 4,
    });

  const graphPie2 = () =>
    templateCardGraph({
      title: 'Pie Chart 2 -Most Popular restaurants',
      component: <PieChart2Component />,
      count: 5,
    });

  const graphBar1 = () =>
    templateCardGraph({
      title: 'Bar Chart 1 - Product Categories',
      component: <BarChart1Component />,
      count: 6,
    });

  const graphBar2 = () =>
    templateCardGraph({
      title: 'Bar Chart 2 - Quarterly Revenue',
      component: <BarChart2Component />,
      count: 7,
    });

  const graphSeries1 = () =>
    templateCardGraph({
      title: 'Series Chart 1 - Deliveries Over Time',
      component: <SeriesChart1Component />,
      count: 8,
    });

  const graphSeries2 = () =>
    templateCardGraph({
      title: 'Series Chart 2 - User Sales History',
      component: <SeriesChart2Component />,
      count: 9,
    });

  return (
    <>
      <RowStatisticComponent
        children={[graphSeries1(), graphPieSRM(), graphBar2(), graphTemporarySRM(), graphPie1(), graphBarsSRM(), graphPie2(), graphBar1(), graphSeries2()]}
        title={
          <span>
            Statistics <strong>Domi Run</strong>
          </span>
        }
      />
    </>
  );
}

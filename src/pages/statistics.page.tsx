import DriverMonthStatisticComponent from '../components/statistics/driverMonthStatistic.component';
import RowStatisticComponent from '../components/statistics/RowStatisticComponent';
import MonthMostOrdersStatisticComponent from '../components/statistics/monthMostOrdersStatistic.component';
import UserHistoryStatisticComponent from '../components/statistics/usersRegisteredHistoryStatistic.component';

export default function StatisticsPage() {
  const templateCardGraph = ({ title, component, count }) => {
    return (
      <div key={`gp-${count}-ctn`} className={'w-full h-full bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5'}>
        <div key={`gp-${count}-ctn-body`}>
          <h3 key={`gp-${count}-h3`} className={'mb-1 text-center'}>
            {title}
          </h3>
          {component}
        </div>
      </div>
    );
  };
  const graphPieSRM = () => {
    return templateCardGraph({ title: '', component: <DriverMonthStatisticComponent />, count: 1 });
  };

  const graphBarsSRM = () => {
    return templateCardGraph({ title: '', component: <MonthMostOrdersStatisticComponent />, count: 2 });
  };

  const graphTemporarySRM = () => {
    return templateCardGraph({ title: '', component: <UserHistoryStatisticComponent />, count: 3 });
  };

  return (
    <>
      <RowStatisticComponent
        children={[graphPieSRM(), graphBarsSRM(), graphTemporarySRM()]}
        title={
          <span>
            Statistics <strong>Domi Run</strong>
          </span>
        }
      />
    </>
  );
}

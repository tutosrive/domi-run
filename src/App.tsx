import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LoaderPointsComponent from './components/LoaderPoints.component';
import routers from './routers';

const Home = lazy(() => import('./pages/Home.page.tsx'));
const DefaultLayout = lazy(() => import('./layout/Default.layout.tsx'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <div className={'w-screen h-screen fixed top-1/2'}>
      <LoaderPointsComponent />
    </div>
  ) : (
    <>
      <Toaster position="top-right" reverseOrder={false} containerClassName="overflow-auto" />
      <Routes>
        <Route element={<DefaultLayout />}>
          {/*  OUTLET Content */}
          <Route index element={<Home />} />
          {routers.map((router, index) => {
            const { path, component: Component } = router;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense
                    fallback={
                      <div className={'w-screen h-screen fixed top-1/2'}>
                        <LoaderPointsComponent />
                      </div>
                    }
                  >
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;

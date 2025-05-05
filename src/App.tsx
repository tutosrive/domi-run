import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Loader } from 'lucide-react';
import routers from './routers';
import SigInPage from './pages/SigInPage.tsx';

const Home = lazy(() => import('./pages/Home'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <div className={'container text-center width-100 height-100'}>Loading...</div>
  ) : (
    <>
      <Toaster position="top-right" reverseOrder={false} containerClassName="overflow-auto" />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<SigInPage />} />
          {routers.map((router, index) => {
            const { path, component: Component } = router;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
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

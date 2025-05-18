import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/Header.component';
import FooterComponent from '../components/Footer.component';
import ChatbotWidget from '../components/Chatbot/ChatbotWidget';

const DefaultLayout = () => {
  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== SidebarComponent Start ===== --> */}
          {/*<SidebarComponent />*/}
          {/* <!-- ===== SidebarComponent End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden body-main">
            {/* <!-- ===== Header Start ===== --> */}
            <HeaderComponent />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto w-screen p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
            <FooterComponent />
            <ChatbotWidget />
          </div>
          {/* Chat Bot... */}
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    </>
  );
};

export default DefaultLayout;

import './App.css';
import { Outlet } from 'react-router-dom';

import Footer from './components/common/Footer';
import Header from './components/common/Header';

function App() {
  return (
    <div className="flex-col justify-between h-full w-full dark:bg-gray-800">
      <Header />
      <div className="flex justify-center min-h-[85vh] mt-[90px] xs:mt-[130px]">
        <div className="max-w-1200 w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

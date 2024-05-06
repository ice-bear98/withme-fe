import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <div className="w-full dark:bg-gray-800">
      <Header />
      <div className="flex justify-center min-h-[81vh]">
        <div className="max-w-1200 w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

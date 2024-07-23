import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col font-inter">
      <Navbar/>
      <div className="flex-1 overflow-y-auto relative">
        <Routes>
          <Route path="/" element={<Signup/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;

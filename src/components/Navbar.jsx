import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import { FaClipboardList } from "react-icons/fa";
import Cookies from 'js-cookie';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const googleToken = Cookies.get('token');
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem('token');
        Cookies.remove('token');
        Cookies.remove('connect.sid');
        localStorage.removeItem('userId');
        toast.success("Logged Out");
        navigate("/login")
    }
    
  return (
    <header className="bg-royalblue-600 flex h-14 items-center justify-between border-b-[1px] border-b-richblack-700 pl-16 pr-16">
      <div className="text-2xl text-white">
        <FaClipboardList />
      </div>
      <nav>
            <div className="flex items-center gap-4">
                {!(token || googleToken) && (
                    <NavLink 
                    to="/login"
                    className={({ isActive }) =>
                    isActive ? "bg-white text-royalblue-700 px-3 py-2 rounded-md font-bold" : " text-white font-semibold"
                    }
                    >
                    <button>Login</button>
                    </NavLink>
                )}
                {!(token || googleToken) && (
                    <NavLink 
                    to="/signup"
                    className={({ isActive }) =>
                    isActive ? "bg-white text-royalblue-700 px-3 py-2 rounded-md font-bold" : " text-white font-semibold"
                    }
                    >
                    <button>Sign Up</button>
                    </NavLink>
                )}
            </div>
            <div className="flex gap-4">
                    {(token || googleToken) && (
                        <NavLink 
                        to="/dashboard"
                        className={({ isActive }) =>
                        isActive ? "bg-white text-royalblue-700 px-3 py-2 rounded-md font-bold" : " text-white font-semibold"
                        }
                        >
                        <button>Dashboard</button>
                        </NavLink>
                    )}
                    {(token || googleToken) && (
                        <button onClick = {handleLogout} className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">Logout</button>
                    )}
            </div>
      </nav>
    </header>
  )
}

export default Navbar

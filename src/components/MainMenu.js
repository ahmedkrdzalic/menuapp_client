import axios from 'axios';
import React,{useContext} from 'react'
import { Link } from "react-router-dom";
import {LoginContext} from "../helpers/LoginContext";



function MainMenu() {
    const {user, setUser} = useContext(LoginContext);

  return (
    <div className='h-auto bg-gray-900 border-gray-700 text-white border-b-2'>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-4">
        <Link className='' to="/" >
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">MenuApp</span>
          </div>
        </Link>
        <div className="flex-grow flex justify-end w-auto">
          {user 
          ?
          <div>
            
            <Link className='' to="/registration" >
              <button 
              className='mr-2 px-4 py-2 leading-none rounded bg-white hover:bg-teal-500 border border-transparent hover:border hover:border-white hover:text-white text-teal-600 ' 
              type='submit'>
                  Register
              </button>
            </Link>
            <Link className='' to="/login" >
              <button 
              className='px-2 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white' 
              type='submit'>
                  Login
              </button>
            </Link>
          </div>
          :
          <div>
            <Link className='' to="/dashboard" >
              <button 
              className='px-2 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white' 
              type='submit'>
                  Dashboard
              </button>
            </Link>
          </div>
          }

          
        </div>
      </nav>
    </div>
  )
}

export default MainMenu
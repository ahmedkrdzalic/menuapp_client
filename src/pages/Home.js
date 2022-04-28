import React from 'react';
import axios from "axios";
import {useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";



function Home() {

    return (
        <div className='bg-gray-700 h-screen flex place-content-center'>
            <div className='flex flex-col justify-center items-center'>
                <p className='text-gray-200 text-8xl text-center px-3'>
                    Where making menus is <b>easy</b> and <b>convenient</b>!
                </p>
                <Link className='' to="/registration" >
                    <button 
                    className='my-8 text-2xl bg-teal-500 hover:bg-teal-400 hover:text-white py-2 px-6 rounded-lg text-teal-50 font-thin' 
                    type='submit'>
                        Register
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;

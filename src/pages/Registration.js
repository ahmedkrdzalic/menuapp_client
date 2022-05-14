import React from 'react'
import axios from "axios";
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import register_login_img from '../assets/register-login.jpg';


function Registration() {

    let navigate = useNavigate();

    const initalValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    const Registration_Submit = async (data) => {
        axios.post("http://localhost:3001/user/registration", data, {
            headers: {
                "Content-Type": "application/json"
                },
                withCredentials: true
            }
        ).then((response) => {
            if(response.data === "SUCCESS"){
                navigate("/login");
            };
            alert(response.data);
        })
    };


  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full object-cover border-r-2 h-screen border-gray-700' src={register_login_img} alt=""/>
        </div>
        <div className='bg-gray-800 flex flex-col justify-center'>
            <Formik initialValues={initalValues} onSubmit={Registration_Submit} validationSchema={validationSchema}>
                <Form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg border-2 border-gray-700' >
                    <h2 className='text-4xl dark:text-white font-bold text-center'>Register</h2>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Username: </label>
                        <ErrorMessage className='text-teal-400' name="username" component="span" />
                        <Field 
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-solid focus:border-x-2 focus:border-teal-400 focus:bg-gray-800 focus:outline-none"
                            id="username" 
                            name="username" 
                            placeholder="john_doe" 
                        />
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Password: </label>
                        <ErrorMessage className='text-teal-400' name="password" component="span" />
                        <Field 
                            className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-solid focus:border-x-2 focus:border-teal-400 focus:bg-gray-800 focus:outline-none"
                            id="password" 
                            name="password" 
                            placeholder="1234"
                            type="password"
                        />
                    </div>
                    
                    <button 
                        className='w-full my-2 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 rounded-lg' 
                        type='submit'
                    >
                        Register
                    </button>
                    
                </Form>
            </Formik>
        </div>
    </div>
  )
}

export default Registration
import React from 'react'
import axios from "axios";
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();

    const initalValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    const Login_Submit = (data) => {
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            navigate("/");
            console.log(response);
        })
    };



  return (
    <div>
        <Formik initialValues={initalValues} onSubmit={Login_Submit} validationSchema={validationSchema}>
            <Form className='formContainer' >
                <label>Username: </label>
                <ErrorMessage name="username" component="span" />
                <Field 
                    id="inputNewQuestion" 
                    name="username" 
                    placeholder="Username..." 
                />
                <label>Password: </label>
                <ErrorMessage name="password" component="span" />
                <Field 
                    id="inputNewQuestion" 
                    name="password" 
                    placeholder="password..."
                    type="password"
                />

                <button type='submit'>Login</button>
            </Form>
        </Formik>
    </div>
  )
}

export default Login
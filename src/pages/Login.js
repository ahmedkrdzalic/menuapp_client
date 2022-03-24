import React, {useContext} from 'react'
import axios from "axios";
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {LoginContext} from "../helpers/LoginContext";


function Login() {
    let navigate = useNavigate();
    const {user, setUser} = useContext(LoginContext);

    const initalValues = {
        username: "",
        password: ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    const Login_Submit = (data) => {
        axios.post("http://localhost:3001/user/login", data, {
            headers: {
              "Content-Type": "application/json"
              },
              withCredentials: true
            })
            .then((response) => {
                if(response.data.error) alert(response.data.error);
                else {
                    //izbrisati log usera i izbaciti pass i dodati nove stvari vezane za usera
                    setUser(response.data.user);
                    navigate("/");
                }
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
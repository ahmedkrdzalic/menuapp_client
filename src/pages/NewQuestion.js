import React from 'react';
import axios from "axios";
import {Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function NewQuestion() {

    let navigate = useNavigate();

    const initalValues = {
        title: "",
        questionText: "",
        userName: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        questionText: Yup.string().required(),
        userName: Yup.string().min(3).max(15).required()
    })

    const NewQuestion_Submit = (data) => {
        axios.post("http://localhost:3001/questions", data).then((response) => {
            navigate("/");
        })
    };

    return (
        <div className='newQuestionPage'>
            <Formik initialValues={initalValues} onSubmit={NewQuestion_Submit} validationSchema={validationSchema}>
                <Form className='formContainer' >
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span" />
                    <Field 
                        id="inputNewQuestion" 
                        name="title" 
                        placeholder="Something catchy..." 
                    />

                    <label>Question: </label>
                    <ErrorMessage name="questionText" component="span" />
                    <Field 
                        id="inputNewQuestion" 
                        name="questionText" 
                        placeholder="Your Question..." 
                    />

                    <label>Username: </label>
                    <ErrorMessage name="userName" component="span" />
                    <Field 
                        id="inputNewQuestion" 
                        name="userName" 
                        placeholder="Username..." 
                    />

                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default NewQuestion;

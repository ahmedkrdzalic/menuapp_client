import React from 'react';
import axios from "axios";
import {useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


function Home() {
    const [listOfQuestions, setListOfQuestions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/questions").then((response) => {
        setListOfQuestions(response.data);
        })
    }, []);

    let navigate = useNavigate();

    return (
        <div>
            {listOfQuestions.map((value, key) => {
                return (
                    <div className='question' key={key} onClick={() => {navigate(`/question/${value.id}`)}}>
                        <div className='question_title'> {value.title} </div>
                        <div className='question_body'> {value.questionText} </div>
                        <div className='question_footer'> {value.userName} </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Home;

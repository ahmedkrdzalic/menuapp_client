import React from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


function Question() {

    let { id } = useParams();

    const [question, setQuestion] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3001/questions/${id}`).then((response) => {
          setQuestion(response.data);
        })
        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
          setComments(response.data);
        })

    }, [])


    const addNewComment = () => {
      axios.post(`http://localhost:3001/comments`, {commentBody: newComment, QuestionId: id}, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }).then((response) => {
            const commentToAdd = {commentBody: newComment, username: response.data.username};
            setComments([...comments, commentToAdd]);
            setNewComment("");
        })
    }

  return (
    <div className='container py-3'>
      <div className='row py-3'>
          <span className='h2 text-dark'>
            {question.title}
            <span className='h5 text-warning'> - {question.userName}</span>
          </span>
          <hr className="border-2 border-top border-dark" />
          <p>{question.questionText}</p>
      </div>
      <hr className="border-2 border-top border-dark" />
      <div className='row py-2 px-3'>
        <h6 className='text-secondary'>Comments:</h6>
        {comments.map((comment, key) => {
          return (
            <div className='mt-1 pt-2 border-1 border rounded' key={key}>
              <h5>{comment.commentBody} - <span>{comment.username}</span></h5>
            </div>
          )
        })}
      </div>
      <div className='px-3 row py-2'>
        <div className='p-2 border-1 border rounded '>
          <h6 className='text-secondary'>Add Comment: </h6>
          <input className='form-control' type="text" placeholder='Comment...' value={newComment} onChange={(event) => {setNewComment(event.target.value)}} />
          <button className="w-auto my-1 btn btn-primary btn-sm" onClick={addNewComment}>Submit</button>
        </div>
      </div>
      
      
    </div>
  )
}

export default Question
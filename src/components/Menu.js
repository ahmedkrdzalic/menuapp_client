import axios from 'axios';
import React,{useContext} from 'react'
import { Link } from "react-router-dom";
import {LoginContext} from "../helpers/LoginContext";



function Menu() {
    const {user, setUser} = useContext(LoginContext);

    const logout = (e) => {
        
        setUser({});
    }

  return (
    <div className='container-fluid bg-dark p-0'>
        <header className="py-3 px-2 text-white">
            <div className="container p-0">
                <div className="d-flex flex-wrap justify-content-start">
                    <ul className="nav col-auto me-auto mb-2 justify-content-center mb-md-0">
                        <li className=''><Link className='text-white' to="/" >Home</Link></li>
                        <li className='px-1'><Link className='text-white' to="/newquestion" >New Question</Link></li>
                        {user.id && <li className=''><Link className='text-white' to="/profile" >Profile</Link></li>}
                    </ul>
                    <div className="text-end">
                        {!user.id && <Link className='text-white' to="/login" >
                            <button type="button" className="btn btn-sm btn-outline-light me-2">
                                Login
                            </button>
                        </Link>}
                        {!user.id && <Link className='text-white' to="/registration" >
                            <button type="button" className="btn btn-sm btn-warning">
                                Sign-up
                            </button>
                        </Link>}
                        {user.id &&
                            <button type="button" className="btn btn-sm btn btn-outline-light" onClick={logout}>
                                Logout
                            </button>
                        }
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Menu
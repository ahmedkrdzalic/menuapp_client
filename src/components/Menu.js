import React from 'react'
import { Link } from "react-router-dom";


function Menu() {
  return (
    <div className='container-fluid bg-dark p-0'>
        <header className="py-3 px-2 text-white">
            <div className="container p-0">
                <div className="d-flex flex-wrap justify-content-start">
                    <ul className="nav col-auto me-auto mb-2 justify-content-center mb-md-0">
                        <li className=''><Link className='text-white' to="/" >Home</Link></li>
                        <li className='px-1'><Link className='text-white' to="/newquestion" >New Question</Link></li>
                    </ul>
                    <div className="text-end">
                        <Link className='text-white' to="/login" >
                            <button type="button" className="btn btn-sm btn-outline-light me-2">
                                Login
                            </button>
                        </Link>
                        <Link className='text-white' to="/registration" >
                            <button type="button" className="btn btn-sm btn-warning">
                                Sign-up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Menu
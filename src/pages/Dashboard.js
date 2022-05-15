import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import {LoginContext} from "../helpers/LoginContext";
import MenuCard from "../components/MenuCard";


function Dashboard() {
    const[menus, setMenus] = useState([]);
    const {user, setUser} = useContext(LoginContext);
    


    useEffect(() => {
        axios.get(`http://localhost:3001/menus`, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
            })
            .then((response) => {
                setMenus(response.data)
            }
        );
    }, []);

    //now display them in cards and create last card as a create new menu card with plus in middle.
    //and then make api access point for getting and creating the menu. and Create a sample menu JSON file
  return (
    <div className='bg-gray-900'>
        <div className='container mx-auto flex flex-col justify-center'>
            <div className='min-h-screen flex flex-row gap-2 flex-wrap bg-gray-800 py-5 px-2 content-start justify-center'>
                
                <MenuCard add="true" />
                
                {menus.map((menu) => {
                    return (
                        <MenuCard menu={menu}/>
                    )
                })}


            </div>
        </div>
    </div>
  )
}

export default Dashboard
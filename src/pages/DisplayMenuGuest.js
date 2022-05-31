import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DisplayMenu from "./DisplayMenu"
import { INITIAL_MENU } from '../helpers/InitialMenu';


function DisplayMenuGuest() {

    let { menutitle } = useParams();
    const[menu, setMenu] = useState(null);


    useEffect(() => {
        axios.get(`http://localhost:3001/menus/title/${menutitle}`, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
            })
            .then((response) => {
                console.log(response.data);
                if(response.data || response.data !== {}){
                    setMenu(response.data);
                }
            })
            .catch((err)=>{
                console.log(err);
                setMenu(null)
            });
    }, [menutitle]);

    if(menu === {} || menu === null){
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <span className='text-2xl font-thin text-gray-500'>Menu not found</span>
            </div>
        )
    }else{
        return (
            <div>
                <DisplayMenu menu={menu}/>
            </div>
          )
    }

  
}

export default DisplayMenuGuest
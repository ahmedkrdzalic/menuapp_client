import axios from 'axios';
import React, { useEffect, useState} from 'react'
import MenuCard from "../components/MenuCard";
import { INITIAL_MENU } from '../helpers/InitialMenu';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const[menus, setMenus] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [possibleNewMenu, setPossibleNewMenu] = useState("");


    const [errorResponseNewMenu, setErrorResponseNewMenu] = useState("");

    let navigate = useNavigate();




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
    

    function onClickPossibleNewMenu(){
        let mockupMenu = INITIAL_MENU;
        mockupMenu.title = possibleNewMenu;
        mockupMenu.menuDATA.title = possibleNewMenu;

        axios.post(`http://localhost:3001/menus`, mockupMenu, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
            })
            .then((res)=>{
                setErrorResponseNewMenu(res.data.msg);
                navigate(`/editmenu/${res.data.menu_id}`)
            })
            .catch((error)=>{
                console.log(error.response.data.err);
                setErrorResponseNewMenu(error.response.data.err);
            })
    }


    
  return (
    <div className='bg-gray-900'>
        <div className='container mx-auto flex flex-col justify-center'>
            <div className='min-h-screen flex flex-row gap-2 flex-wrap bg-gray-800 py-5 px-2 content-start justify-center'>
                
                <MenuCard props={{add:"true", setShowModal:setShowModal}}/>
                
                {menus.map((menu) => {
                    return (
                        <MenuCard props={{menu:menu, setMenus:setMenus, menus:menus}}/>
                    )
                })}


            </div>
        </div>

        {/** POPUP MODAL ADD NEW MENU */}
        {showModal ? (
            <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 "
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="rounded shadow-lg relative flex flex-col w-full bg-white border-2 border-teal-500">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl text-slate-500 font-semibold text-left">
                            Create New Menu
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-slate-500 font-semibold"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="bg-transparent h-6 w-6 block">
                            x
                            </span>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="p-4 flex-auto justify-center">
                        <label className='pl-1 text-sm text-gray-600 font-thin'>Menu name:</label>
                        <input 
                        value={possibleNewMenu}
                        onChange={(e)=>{
                            setPossibleNewMenu(e.target.value);
                            setErrorResponseNewMenu("");
                        }} 
                        className='rounded w-full mx-auto text-gray-500 px-2 py-1 border border-slate-200' />
                        <p className='text-sm text-red-800 font-thin'>{errorResponseNewMenu}</p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-center p-3 rounded-b">
                        <button
                            className="inline-block bg-gray-200 hover:bg-gray-300 rounded px-3 py-2 text-sm font-semibold mr-2 mb-2"
                            type="button"
                            onClick={(e)=>{
                                e.preventDefault();
                                onClickPossibleNewMenu();
                            }}
                        >
                            Create
                        </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}


    </div>
  )
}

export default Dashboard
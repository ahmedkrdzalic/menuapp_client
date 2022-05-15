import React, { useState, useEffect} from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { TEST_MENU } from '../helpers/TestData';
import DisplayMenu from './DisplayMenu';


function EditMenu() {
    let { id } = useParams();

    const[menu, setMenu] = useState(TEST_MENU);
    const[category_id, setCategory_id] = useState(0);
    const[item_id, setItem_id] = useState(0);


    

    useEffect(() => {
        axios.get(`http://localhost:3001/menus/${id}`, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
            })
            .then((response) => {
                //setMenu(response.data)
                console.log(response.data)
            }
        );
    }, []);

    function onChangeValue_category_id(e) {
        setCategory_id(e.target.value);
    }

    function onChangeValue_item_id(e) {
        setItem_id(e.target.value);
    }



  return (
    <div className=''>
        <div className='text-gray-100 float-left h-screen w-72 p-2 border-r-2 border-solid border-gray-400 bg-gray-900'>
            <label className='text-md text-gray-300 font-thin'>Menu: </label><span className='text-2xl font-bold text-gray-100'>{menu.title}</span>
            <hr className='border-gray-500 pb-3' />
            <label className='text-md text-gray-300 font-thin'>Categories: </label>
            <div className='flex flex-col space-y-px mt-2' onChange={(e) => {onChangeValue_category_id(e)}}>
                {menu.menuDATA.category_names.map((category_name, id) => {
                    return (
                        <>
                            <input type="radio" id={id + "category"} value={id} className='' name="category_name"></input>
                            <label className="text-left px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600" htmlFor={id + "category"} >
                                {category_name}
                            </label>
                        </>
                    )
                } )}
            </div>
            <hr className='border-gray-600 mb-3 mt-5' />
            <label className='text-md text-gray-300 font-thin'>Items: </label>
            <div className='flex flex-col space-y-px mt-2' onChange={(e) => {onChangeValue_item_id(e)}}>
                {menu.menuDATA.categories[category_id].map((item, id) => {
                    return (
                        <>
                            <input type="radio" id={id + "item"} value={id} className='' name="category_item"></input>
                            <label className="text-left px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600" htmlFor={id + "item"} >
                                {item.title}
                            </label>
                        </>
                    )
                } )}
            </div>
            <hr className='border-gray-600 mb-3 mt-5' />
            <label className='text-md text-gray-300 font-thin'>Edit Content: </label>
            <div className='flex flex-col space-y-px mt-2'>
                <label className='text-sm text-gray-300 font-thin'>title:</label>
                <input 
                className='text-gray-500 px-2 py-1' 
                value={menu.menuDATA.categories[category_id][item_id].title} 
                onChange={(e)=>{
                    let newMenu = {...menu};
                    newMenu.menuDATA.categories[category_id][item_id].title = e.target.value;
                    setMenu(newMenu);
                }}/>

                <label className='text-sm text-gray-300 font-thin'>description:</label>
                <input 
                className='text-gray-500 px-2 py-1' 
                value={menu.menuDATA.categories[category_id][item_id].description} 
                onChange={(e)=>{
                    let newMenu = {...menu};
                    newMenu.menuDATA.categories[category_id][item_id].description = e.target.value;
                    setMenu(newMenu);
                }}/>
                
                <label className='text-sm text-gray-300 font-thin'>price:</label>
                <input 
                className='text-gray-500 px-2 py-1' 
                value={menu.menuDATA.categories[category_id][item_id].price} 
                onChange={(e)=>{
                    let newMenu = {...menu};
                    newMenu.menuDATA.categories[category_id][item_id].price = e.target.value;
                    setMenu(newMenu);
                }}/>
            </div>

        </div>
        <div className='block overflow-hidden '>
            <DisplayMenu menu={menu} />
        </div>
    </div>


  )
}

export default EditMenu
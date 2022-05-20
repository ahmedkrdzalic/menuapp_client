import React, { useState, useEffect} from 'react'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { INITIAL_MENU } from '../helpers/InitialMenu';
import DisplayMenu from './DisplayMenu';


function EditMenu() {
    let { id } = useParams();

    const[menu, setMenu] = useState(INITIAL_MENU);
    const[category_id, setCategory_id] = useState(0);
    const[item_id, setItem_id] = useState(0);

    //about form for adding category  
    const[addCategory, setAddCategory] = useState(false);
    const[addCategoryName, setAddCategoryName] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:3001/menus/${id}`, {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
            })
            .then((response) => {
                setMenu(response.data)
            }
        );
    }, []);

    //radio button for categories
    function onChangeValue_category_id(e) {
        setCategory_id(e.target.value);
        setItem_id(0);
    }

    //radio button for items
    function onChangeValue_item_id(e) {
        setItem_id(e.target.value);
    }

    function onSubmitAddCategory(e){
        e.preventDefault();
        let newMenu = {...menu};
        let newCategory_names = [...menu.menuDATA.category_names, addCategoryName];
        newMenu.menuDATA.category_names = newCategory_names;

        let newCategoryToAdd = INITIAL_MENU.menuDATA.categories[0];
        let newCategories = [...menu.menuDATA.categories, newCategoryToAdd];
        newMenu.menuDATA.categories = newCategories;

        setMenu(newMenu);
        console.log(addCategoryName);
    }



  return (
    <div className=''>
        <div className='text-gray-100 float-left h-screen max-h-screen overflow-auto w-72 p-2 border-r-2 border-solid border-gray-400 bg-gray-900'>
            <label className='text-md text-gray-300 font-thin'>Menu: </label><span className='text-2xl font-bold text-gray-100'>{menu.title}</span>
            <hr className='border-gray-500 pb-3' />
            {/* DISPLAY CATEGORIES */}
            <label className='text-md text-gray-300 font-thin'>Categories: </label>
            <div className='flex flex-col' >
                <div className='flex flex-col space-y-px mt-2' onChange={(e) => {onChangeValue_category_id(e)}}>
                    {menu.menuDATA.category_names.map((category_name, id) => {
                        return (
                            <>
                                <input type="radio" id={id + "category"} value={id} className='' name="category_name" hidden ></input>
                                <label className="text-left px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600" htmlFor={id + "category"} >
                                    {category_name}
                                </label>
                            </>
                        )
                    } )}
                </div>
                <div onClick={()=>{if(addCategory)setAddCategory(false); else setAddCategory(true)}} className="mt-px cursor-pointer text-center px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600 text-gray-500 hover:text-gray-300 font-bold " >
                    +
                </div>
                {
                    addCategory &&
                    <form className='flex flex-col space-y-px mt-2' onSubmit={onSubmitAddCategory}>
                        <label className='text-sm text-gray-300 font-thin my-2'>category name:</label>
                        <input 
                        type="text"
                        className='text-gray-500 px-2 py-1' 
                        value={addCategoryName} 
                        onChange={(e)=>{setAddCategoryName(e.target.value)}} />
                        <input type='submit' className="cursor-pointer text-center px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600 text-gray-500 hover:text-gray-300 " />
                    </form>
                }
            </div>
            <hr className='border-gray-600 mb-3 mt-5' />
            {/* DISPLAY ITEMS */}
            <label className='text-md text-gray-300 font-thin'>Items: </label>
            <div className='flex flex-col space-y-px mt-2' onChange={(e) => {onChangeValue_item_id(e)}}>
                {menu.menuDATA.categories[category_id].map((item, id) => {
                    return (
                        <>
                            <input type="radio" id={id + "item"} value={id} className='' name="category_item" hidden></input>
                            <label className="text-left px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600" htmlFor={id + "item"} >
                                {item.title}
                            </label>
                        </>
                    )
                } )}
            </div>
            <hr className='border-gray-600 mb-3 mt-5' />
            {/* EDIT CONTENT */}
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
        <div className='block overflow-hidden overflow-y-auto max-h-screen'>
            <DisplayMenu menu={menu} />
        </div>
    </div>


  )
}

export default EditMenu
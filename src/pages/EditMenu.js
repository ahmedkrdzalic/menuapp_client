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
    const[addCategoryFormIsOpen, setAddCategoryFormIsOpen] = useState(false);
    const[addCategoryName, setAddCategoryName] = useState("");

    //about form for adding item  
    const[addItemFormIsOpen, setAddItemFormIsOpen] = useState(false);
    const[addItemName, setAddItemName] = useState("");


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
    }, [id]);

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
        var newMenu = {...menu};
        var newCategory_names = [...newMenu.menuDATA.category_names, addCategoryName];
        newMenu.menuDATA.category_names = newCategory_names;

        var newCategoryToAdd = INITIAL_MENU.menuDATA.categories[0];
        var newCategories = [...newMenu.menuDATA.categories, newCategoryToAdd];
        newMenu.menuDATA.categories = newCategories;

        setMenu(newMenu);
    }

    function onSubmitAddItem(e){
        e.preventDefault();
        var newMenu = {...menu};

        // not working like in comments, u have to iterate through array, not directly 
        //var newItemToAdd = INITIAL_MENU.menuDATA.categories[0][0];
        //newItemToAdd.title = addItemName;

        var newItemToAdd =
            {
                title: addItemName,
                description: "Test Description",
                price: 3,
                img: ""
            }
        var newItems = [...newMenu.menuDATA.categories[category_id], newItemToAdd];
        console.log(newItems);
        newMenu.menuDATA.categories[category_id] = newItems;

        setMenu(newMenu);
    }

    function onClickDeleteCategory(e) {
        var newMenu = {...menu};
        if(newMenu.menuDATA.category_names.length > 1){
            newMenu.menuDATA.category_names.splice(e.target.value, 1);
            newMenu.menuDATA.categories.splice(e.target.value, 1);
            setCategory_id(0);
            setItem_id(0);
        }else {
            alert("You must have at least one CATEGORY in the MENU.");
        }
        console.log(newMenu);
        setMenu(newMenu);
    }

    function onClickDeleteItem(IDs) {
        var newMenu = {...menu};
        if(newMenu.menuDATA.categories[IDs.cat_id].length > 1){
            newMenu.menuDATA.categories[IDs.cat_id].splice(IDs.item_id, 1);
            setItem_id(0);
        }else {
            alert("You must have at least one ITEM in the CATEGORY.");
        }

        setMenu(newMenu);
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
                                <label className="flex justify-between px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600" htmlFor={id + "category"} >
                                    <span className=''>{category_name}</span>
                                    <button onClick={(e)=>{onClickDeleteCategory(e)}} value={id} className='text-red-700 hover:text-red-300 bg-transparent px-2'>x</button>
                                </label>
                            </>
                        )
                    } )}
                </div>
                <div onClick={()=>{if(addCategoryFormIsOpen)setAddCategoryFormIsOpen(false); else setAddCategoryFormIsOpen(true)}} className="mt-px cursor-pointer text-center px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600 text-gray-500 hover:text-gray-300 font-bold " >
                    +
                </div>
                {
                    addCategoryFormIsOpen &&
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
            <div className='flex flex-col'>
                <div className='flex flex-col space-y-px mt-2'  onChange={(e) => {onChangeValue_item_id(e)}}>
                    {menu.menuDATA.categories[category_id].map((item, id) => {
                        return (
                            <>
                                <input type="radio" id={id + "item"} value={id} className='' name="category_item" hidden></input>
                                <label className="flex justify-between px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600" htmlFor={id + "item"} >
                                    <span className=''>{item.title}</span>
                                    <button onClick={(e)=>{onClickDeleteItem({item_id:id, cat_id:category_id});}} className='text-red-700 hover:text-red-300 bg-transparent px-2'>x</button>
                                </label>
                            </>
                        )
                    } )}
                </div>
                <div onClick={()=>{if(addItemFormIsOpen)setAddItemFormIsOpen(false); else setAddItemFormIsOpen(true)}} className="mt-px cursor-pointer text-center px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600 text-gray-500 hover:text-gray-300 font-bold " >
                    +
                </div>
                {
                    addItemFormIsOpen &&
                    <form className='flex flex-col space-y-px mt-2' onSubmit={onSubmitAddItem}>
                        <label className='text-sm text-gray-300 font-thin my-2'>item name:</label>
                        <input 
                        type="text"
                        className='text-gray-500 px-2 py-1' 
                        value={addItemName} 
                        onChange={(e)=>{setAddItemName(e.target.value)}} />
                        <input type='submit' className="cursor-pointer text-center px-3 py-1 bg-gray-700 rounded-sm hover:bg-gray-600 text-gray-500 hover:text-gray-300 " />
                    </form>
                }
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
                    var newMenu = {...menu};
                    newMenu.menuDATA.categories[category_id][item_id].title = e.target.value;
                    setMenu(newMenu);
                }}/>

                <label className='text-sm text-gray-300 font-thin'>description:</label>
                <input 
                className='text-gray-500 px-2 py-1' 
                value={menu.menuDATA.categories[category_id][item_id].description} 
                onChange={(e)=>{
                    var newMenu = {...menu};
                    newMenu.menuDATA.categories[category_id][item_id].description = e.target.value;
                    setMenu(newMenu);
                }}/>
                
                <label className='text-sm text-gray-300 font-thin'>price:</label>
                <input 
                className='text-gray-500 px-2 py-1' 
                value={menu.menuDATA.categories[category_id][item_id].price} 
                onChange={(e)=>{
                    var newMenu = {...menu};
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